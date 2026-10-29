import test from "node:test";
import assert from "node:assert/strict";

import { readFileSync } from "node:fs";

const workerPath = new URL(
    "../../backend/worker.js",
    import.meta.url
);

const source = readFileSync(workerPath, "utf8");

test("No existen claves Groq incrustadas en el Worker", () => {
    assert.equal(
        /gsk_[A-Za-z0-9]{20,}/.test(source),
        false
    );
});

test("La API key se obtiene desde el entorno", () => {
    assert.ok(
        source.includes("env.GROQ_API_KEY")
    );
});

test("El Worker utiliza HTTPS para consultar Groq", () => {
    assert.ok(
        source.includes("https://api.groq.com")
    );
});
