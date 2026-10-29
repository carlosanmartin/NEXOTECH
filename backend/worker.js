import { businessKnowledge } from "./knowledge.js";
import systemInstructions from "./prompts/nexo-ai-system.txt";

const MODEL = "openai/gpt-oss-120b";

const GROQ_URL =
    "https://api.groq.com/openai/v1/chat/completions";

const MAX_MESSAGE_LENGTH = 1000;
const MAX_REQUEST_BYTES = 4096;

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-store"
        }
    });
}

function buildSystemPrompt() {
    return `
${systemInstructions}

CONOCIMIENTO AUTORIZADO:

${businessKnowledge}
`;
}

export default {
    async fetch(request, env) {
        if (request.method !== "POST") {
            return jsonResponse(
                { error: "Método no permitido" },
                405
            );
        }

        const contentType =
            request.headers.get("Content-Type") || "";

        if (!contentType.includes("application/json")) {
            return jsonResponse(
                { error: "Content-Type no permitido" },
                415
            );
        }

        const contentLength = Number(
            request.headers.get("Content-Length") || 0
        );

        if (contentLength > MAX_REQUEST_BYTES) {
            return jsonResponse(
                { error: "Solicitud demasiado grande" },
                413
            );
        }

        let body;

        try {
            body = await request.json();
        } catch {
            return jsonResponse(
                { error: "JSON inválido" },
                400
            );
        }

        const message = body?.message;

        if (
            typeof message !== "string" ||
            message.trim().length < 2 ||
            message.length > MAX_MESSAGE_LENGTH
        ) {
            return jsonResponse(
                { error: "Pregunta inválida" },
                400
            );
        }

        if (!env.GROQ_API_KEY) {
            return jsonResponse(
                { error: "Servicio no configurado" },
                503
            );
        }

        try {
            const response = await fetch(GROQ_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${env.GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: MODEL,
                    temperature: 0.2,
                    max_completion_tokens: 250,
                    messages: [
                        {
                            role: "system",
                            content: buildSystemPrompt()
                        },
                        {
                            role: "user",
                            content: message.trim()
                        }
                    ]
                }),
                signal: AbortSignal.timeout(15000)
            });

            if (!response.ok) {
                return jsonResponse(
                    { error: "Error del proveedor de IA" },
                    502
                );
            }

            const data = await response.json();

            const answer =
                data?.choices?.[0]?.message?.content;

            if (
                typeof answer !== "string" ||
                !answer.trim()
            ) {
                return jsonResponse(
                    { error: "Respuesta inválida" },
                    502
                );
            }

            return jsonResponse({
                answer: answer.trim()
            });

        } catch {
            return jsonResponse(
                { error: "Asistente temporalmente no disponible" },
                503
            );
        }
    }
};
