import { chromium } from "@playwright/test";
import { readFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

const outputDirectory = path.join(
  root,
  "docs/evidencias/chatbot"
);

mkdirSync(outputDirectory, { recursive: true });

const start = Number(process.argv[2] || 1);
const end = Number(process.argv[3] || start);

if (
  !Number.isInteger(start) ||
  !Number.isInteger(end) ||
  start < 1 ||
  end > 20 ||
  start > end
) {
  throw new Error("Rango inválido.");
}

const document = readFileSync(
  path.join(root, "docs/pruebas.md"),
  "utf8"
);

const pattern =
  /^### (PR-\d{2})\s*\r?\n\s*Pregunta:\s*\r?\n([\s\S]*?)\r?\n\s*Resultado esperado:/gm;

const scenarios = [...document.matchAll(pattern)]
  .map(match => ({
    id: match[1],
    question: match[2].trim()
  }))
  .filter(scenario => {
    const number = Number(scenario.id.slice(3));
    return number >= start && number <= end;
  });

if (!scenarios.length) {
  throw new Error("No se encontraron escenarios.");
}

const browser = await chromium.launch({
  headless: true
});

try {
  const page = await browser.newPage({
    viewport: {
      width: 1440,
      height: 900
    },
    deviceScaleFactor: 1
  });

  for (const scenario of scenarios) {
    console.log(`Ejecutando ${scenario.id}...`);

    await page.goto(
      "http://127.0.0.1:5173/asistente.html",
      { waitUntil: "networkidle" }
    );

    const responsePromise = page.waitForResponse(
      response =>
        response.url().includes(
          "nexotech-ai.nexotech-cartagena.workers.dev"
        ) &&
        response.request().method() === "POST",
      { timeout: 30000 }
    );

    await page.locator("#chat-input").fill(scenario.question);
    await page.locator("#chat-submit").click();

    const response = await responsePromise;

    if (response.status() !== 200) {
      throw new Error(
        `${scenario.id}: Worker devolvió HTTP ${response.status()}`
      );
    }

    const data = await response.json();

    if (
      typeof data.answer !== "string" ||
      !data.answer.trim()
    ) {
      throw new Error(
        `${scenario.id}: respuesta vacía o inválida`
      );
    }

    await page.waitForFunction(
      expected => {
        const messages = [
          ...document.querySelectorAll(
            "#chat-messages .nx-message-assistant"
          )
        ];

        if (messages.length < 2) return false;

        const actual = messages.at(-1)
          .querySelector("p")?.textContent;

        return actual === expected;
      },
      data.answer,
      { timeout: 30000 }
    );

    const screenshotPath = path.join(
      outputDirectory,
      `${scenario.id}.png`
    );

    await page.screenshot({
      path: screenshotPath,
      fullPage: true
    });

    console.log(
      `${scenario.id}: HTTP 200, respuesta visible y captura guardada.`
    );

    await page.waitForTimeout(10000);
  }
} finally {
  await browser.close();
}
