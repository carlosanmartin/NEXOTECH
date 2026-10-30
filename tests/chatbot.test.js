import { test } from "vitest";
import { strict as assert } from "node:assert";

import worker from "../backend/worker.js";

const TEST_IP = "192.0.2.10";

const mockRateLimiter = {
    async limit() {
        return { success: true };
    }
};

function createRequest(message, options = {}) {
    const headers = {
        "Content-Type": "application/json"
    };

    if (options.includeIp !== false) {
        headers["CF-Connecting-IP"] = TEST_IP;
    }

    if (options.origin) {
        headers["Origin"] = options.origin;
    }

    return new Request("http://localhost:8787/", {
        method: "POST",
        headers,
        body: JSON.stringify({ message })
    });
}

function createEnv(options = {}) {
    return {
        CHAT_RATE_LIMITER:
            options.rateLimiter ?? mockRateLimiter,

        GROQ_API_KEY:
            options.apiKey
    };
}

test("Rechaza solicitudes GET", async () => {
    const response = await worker.fetch(
        new Request("http://localhost:8787/"),
        {}
    );

    assert.equal(response.status, 405);
});

test("Rechaza preguntas vacías", async () => {
    const response = await worker.fetch(
        createRequest(""),
        {}
    );

    assert.equal(response.status, 400);
});

test("Rechaza preguntas demasiado largas", async () => {
    const response = await worker.fetch(
        createRequest("A".repeat(1001)),
        {}
    );

    assert.equal(response.status, 400);
});

test("Rechaza preguntas de un carácter", async () => {
    const response = await worker.fetch(
        createRequest("A"),
        {}
    );

    assert.equal(response.status, 400);
});

test("Rechaza JSON inválido", async () => {
    const response = await worker.fetch(
        new Request("http://localhost:8787/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: "{invalid-json"
        }),
        {}
    );

    assert.equal(response.status, 400);
});

test("Rechaza solicitudes sin IP identificable", async () => {
    const response = await worker.fetch(
        createRequest("¿Qué servicios ofrecen?", {
            includeIp: false
        }),
        createEnv()
    );

    assert.equal(response.status, 403);
});

test("Rechaza solicitudes sin Rate Limiter", async () => {
    const response = await worker.fetch(
        createRequest("¿Qué servicios ofrecen?"),
        {}
    );

    assert.equal(response.status, 503);
});

test("Bloquea clientes que superan el límite", async () => {
    const deniedLimiter = {
        async limit() {
            return { success: false };
        }
    };

    const response = await worker.fetch(
        createRequest("¿Qué servicios ofrecen?"),
        createEnv({
            rateLimiter: deniedLimiter
        })
    );

    assert.equal(response.status, 429);
});

test("No consulta Groq sin API key", async () => {
    const response = await worker.fetch(
        createRequest("¿Qué servicios ofrece NEXOTECH?"),
        createEnv()
    );

    assert.equal(response.status, 503);

    const data = await response.json();

    assert.equal(
        data.error,
        "Servicio no configurado"
    );
});

test("Rechaza orígenes no autorizados", async () => {
    const response = await worker.fetch(
        createRequest("¿Qué venden?", {
            origin: "https://sitio-no-autorizado.example"
        }),
        createEnv()
    );

    assert.equal(response.status, 403);
});

test("Acepta el origen oficial de WordPress", async () => {
    const origin = "https://nexotech-cartagena.infinityfreeapp.com";

    const response = await worker.fetch(
        createRequest("¿Qué servicios técnicos ofrecen?", {
            origin
        }),
        createEnv()
    );

    assert.equal(response.status, 503);

    assert.equal(
        response.headers.get("Access-Control-Allow-Origin"),
        origin
    );
});

test("Acepta el origen local autorizado", async () => {
    const response = await worker.fetch(
        createRequest("¿Qué venden?", {
            origin: "http://127.0.0.1:5173"
        }),
        createEnv()
    );

    assert.equal(response.status, 503);

    assert.equal(
        response.headers.get("Access-Control-Allow-Origin"),
        "http://127.0.0.1:5173"
    );
});
