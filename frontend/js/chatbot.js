import { renderHeader } from "../components/header.js";

const CHAT_API =
    "https://nexotech-ai.nexotech-cartagena.workers.dev";

const REQUEST_TIMEOUT = 20000;

function createMessage(role, text) {
    const article = document.createElement("div");

    article.className = `nx-message nx-message-${role}`;

    const label = document.createElement("span");
    label.className = "nx-message-label";
    label.textContent = role === "assistant" ? "NEXO AI" : "Tú";

    const content = document.createElement("p");
    content.textContent = text;

    article.append(label, content);

    return article;
}

document.addEventListener("DOMContentLoaded", () => {
    renderHeader();

    const messages = document.getElementById("chat-messages");
    const form = document.getElementById("chat-form");
    const input = document.getElementById("chat-input");
    const submit = document.getElementById("chat-submit");

    let pending = false;

    function appendMessage(role, text) {
        const message = createMessage(role, text);

        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;

        return message;
    }

    appendMessage(
        "assistant",
        "¡Hola! Soy NEXO AI, el asistente virtual de NEXOTECH. " +
        "Puedo ayudarte a conocer nuestros productos y servicios tecnológicos. " +
        "¿Qué deseas consultar?"
    );

    async function sendMessage(question) {
        const text = question.trim();

        if (!text || pending) return;

        if (text.length > 1000) {
            appendMessage(
                "assistant",
                "Tu pregunta es demasiado larga. Intenta resumirla."
            );
            return;
        }

        pending = true;
        submit.disabled = true;
        input.disabled = true;

        document.querySelectorAll("[data-question]").forEach(button => {
            button.disabled = true;
        });

        appendMessage("user", text);

        const loading = appendMessage(
            "assistant",
            "NEXO AI está preparando su respuesta..."
        );

        try {
            const response = await fetch(CHAT_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: text
                }),
                signal: AbortSignal.timeout(REQUEST_TIMEOUT)
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error(
                        "Has realizado varias consultas. " +
                        "Espera un momento antes de volver a preguntar."
                    );
                }

                throw new Error(
                    "No fue posible obtener una respuesta. Inténtalo nuevamente."
                );
            }

            if (
                typeof data.answer !== "string" ||
                !data.answer.trim()
            ) {
                throw new Error("El asistente devolvió una respuesta vacía.");
            }

            loading.querySelector("p").textContent =
                data.answer;

        } catch (error) {
            loading.querySelector("p").textContent =
                error.name === "TimeoutError"
                    ? "La respuesta está tardando demasiado. Inténtalo nuevamente."
                    : error.message;

        } finally {
            pending = false;
            submit.disabled = false;
            input.disabled = false;

            document.querySelectorAll("[data-question]").forEach(button => {
                button.disabled = false;
            });
            input.focus();

            messages.scrollTop = messages.scrollHeight;
        }
    }

    form.addEventListener("submit", event => {
        event.preventDefault();

        const question = input.value;
        input.value = "";

        sendMessage(question);
    });

    document.querySelectorAll("[data-question]").forEach(button => {
        button.addEventListener("click", () => {
            sendMessage(button.dataset.question);
        });
    });
});

