import { businessKnowledge } from "./knowledge.js";
import systemInstructions from "./prompts/nexo-ai-system.txt";

const MODEL = "openai/gpt-oss-120b";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const MAX_MESSAGE_LENGTH = 1000;
const MAX_REQUEST_BYTES = 4096;

const ALLOWED_ORIGINS = new Set([
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "https://nexotech-cartagena.infinityfreeapp.com"
]);

function getCorsHeaders(request) {
    const origin = request.headers.get("Origin");

    if (!origin || !ALLOWED_ORIGINS.has(origin)) {
        return {};
    }

    return {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Vary": "Origin"
    };
}

function jsonResponse(data, status, request) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-store",
            ...getCorsHeaders(request)
        }
    });
}

function buildSystemPrompt() {
    return `${systemInstructions}

CONOCIMIENTO AUTORIZADO:

${businessKnowledge}`;
}

async function readLimitedJson(request) {
    const reader = request.body?.getReader();

    if (!reader) {
        throw new Error("EMPTY_BODY");
    }

    let total = 0;
    const chunks = [];

    while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        total += value.byteLength;

        if (total > MAX_REQUEST_BYTES) {
            await reader.cancel();
            throw new Error("BODY_TOO_LARGE");
        }

        chunks.push(value);
    }

    const bytes = new Uint8Array(total);
    let offset = 0;

    for (const chunk of chunks) {
        bytes.set(chunk, offset);
        offset += chunk.byteLength;
    }

    const text = new TextDecoder().decode(bytes);

    return JSON.parse(text);
}

export default {
    async fetch(request, env) {
        const origin = request.headers.get("Origin");

        if (origin && !ALLOWED_ORIGINS.has(origin)) {
            return jsonResponse(
                { error: "Origen no autorizado" },
                403,
                request
            );
        }

        if (request.method === "OPTIONS") {
            return new Response(null, {
                status: 204,
                headers: getCorsHeaders(request)
            });
        }

        if (request.method !== "POST") {
            return jsonResponse(
                { error: "Método no permitido" },
                405,
                request
            );
        }

        const contentType =
            request.headers.get("Content-Type") || "";

        if (!contentType.toLowerCase().startsWith("application/json")) {
            return jsonResponse(
                { error: "Content-Type no permitido" },
                415,
                request
            );
        }

        const contentLength = Number(
            request.headers.get("Content-Length") || 0
        );

        if (contentLength > MAX_REQUEST_BYTES) {
            return jsonResponse(
                { error: "Solicitud demasiado grande" },
                413,
                request
            );
        }

        let body;

        try {
            body = await readLimitedJson(request);
        } catch (error) {
            return jsonResponse(
                {
                    error: error.message === "BODY_TOO_LARGE"
                        ? "Solicitud demasiado grande"
                        : "JSON inválido"
                },
                error.message === "BODY_TOO_LARGE" ? 413 : 400,
                request
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
                400,
                request
            );
        }

        const clientIp =
            request.headers.get("CF-Connecting-IP");

        if (!clientIp) {
            return jsonResponse(
                { error: "No fue posible identificar al cliente" },
                403,
                request
            );
        }

        if (!env.CHAT_RATE_LIMITER) {
            return jsonResponse(
                { error: "Protección de solicitudes no configurada" },
                503,
                request
            );
        }

        const rateLimit = await env.CHAT_RATE_LIMITER.limit({
            key: clientIp
        });

        if (!rateLimit.success) {
            return jsonResponse(
                { error: "Demasiadas solicitudes. Intenta nuevamente en un minuto." },
                429,
                request
            );
        }

        if (!env.GROQ_API_KEY) {
            return jsonResponse(
                { error: "Servicio no configurado" },
                503,
                request
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
                    502,
                    request
                );
            }

            const data = await response.json();
            const answer = data?.choices?.[0]?.message?.content;

            if (typeof answer !== "string" || !answer.trim()) {
                return jsonResponse(
                    { error: "Respuesta inválida" },
                    502,
                    request
                );
            }

            return jsonResponse(
                { answer: answer.trim() },
                200,
                request
            );

        } catch {
            return jsonResponse(
                { error: "Asistente temporalmente no disponible" },
                503,
                request
            );
        }
    }
};

