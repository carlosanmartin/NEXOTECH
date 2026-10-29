import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("No existen claves Groq incrustadas en el Worker", () => {
    const source = readFileSync(
        new URL("../backend/worker.js", import.meta.url),
        "utf8"
    );

    assert.equal(
        /gsk_[A-Za-z0-9]{20,}/.test(source),
        false
    );
});

test("La API key se obtiene desde el entorno", () => {
    const source = readFileSync(
        new URL("../backend/worker.js", import.meta.url),
        "utf8"
    );

    assert.ok(source.includes("env.GROQ_API_KEY"));
});

test("El Worker utiliza HTTPS para consultar Groq", () => {
    const source = readFileSync(
        new URL("../backend/worker.js", import.meta.url),
        "utf8"
    );

    assert.ok(
        source.includes("https://api.groq.com")
    );
});
