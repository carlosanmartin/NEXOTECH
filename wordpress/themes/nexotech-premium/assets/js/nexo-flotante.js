(() => {
    "use strict";

    function iniciar() {
        const root = document.querySelector("[data-nx-float]");
        if (!root) return;

        const windowEl = root.querySelector(".nx-float-window");
        const toggle = root.querySelector("[data-nx-toggle]");
        const close = root.querySelector("[data-nx-close]");
        const input = root.querySelector("[data-chat-input]");

        function cerrar() {
            windowEl.hidden = true;
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Abrir chat con NEXO AI");
            toggle.focus();
        }

        toggle.addEventListener("click", () => {
            if (!windowEl.hidden) {
                cerrar();
                return;
            }

            windowEl.hidden = false;
            toggle.setAttribute("aria-expanded", "true");
            toggle.setAttribute("aria-label", "Cerrar chat con NEXO AI");
            if (input && !input.disabled) input.focus();
        });

        close.addEventListener("click", cerrar);

        windowEl.addEventListener("keydown", event => {
            if (event.key === "Escape") cerrar();
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciar);
    } else {
        iniciar();
    }
})();