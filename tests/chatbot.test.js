import { test } from "vitest";
import { strict as assert } from "node:assert";

import worker from "../backend/worker.js";

function createRequest(message) {
    return new Request("http://localhost:8787/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
    });
}

test("Rechaza solicitudes GET", async () => {
    const request = new Request("http://localhost:8787/");

    const response = await worker.fetch(request, {});

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
    const request = new Request("http://localhost:8787/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: "{invalid-json"
    });

    const response = await worker.fetch(request, {});

    assert.equal(response.status, 400);
});

test("No consulta Groq sin API key", async () => {
    const response = await worker.fetch(
        createRequest("¿Qué servicios ofrece NEXOTECH?"),
        {}
    );

    assert.equal(response.status, 503);

    const data = await response.json();

    assert.equal(data.error, "Servicio no configurado");
});

