export function renderHeader() {
    const header = document.getElementById("site-header");

    if (!header) return;

    header.innerHTML = `
        <div class="nx-announcement">
            <div class="container">
                <span>TECNOLOGÍA • INNOVACIÓN • SOPORTE</span>
                <span>Cartagena, Colombia</span>
            </div>
        </div>

        <div class="nx-header-main">
            <div class="container nx-navbar">

                <a href="/" class="nx-brand" aria-label="NEXOTECH Inicio">
                    <span class="nx-brand-symbol">N</span>
                    <span>NEXO<strong>TECH</strong></span>
                </a>

                <button
                    class="nx-menu-toggle"
                    id="nx-menu-toggle"
                    type="button"
                    aria-label="Abrir menú de navegación"
                    aria-expanded="false"
                    aria-controls="nx-navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav
                    class="nx-navigation"
                    id="nx-navigation"
                    aria-label="Navegación principal"
                >
                    <a href="/">Inicio</a>
                    <a href="/productos.html">Productos</a>
                    <a href="/servicios.html">Servicios</a>
                    <a href="/asistente.html">NEXO AI</a>
                    <a href="/contacto.html">Contacto</a>
                </nav>

                <div class="nx-header-actions">

                    <a
                        href="/productos.html"
                        class="nx-cart-button"
                        aria-label="Ver carrito de compras"
                    >
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            aria-hidden="true"
                        >
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"></path>
                        </svg>

                        <span class="nx-cart-count" id="nx-cart-count">0</span>
                    </a>

                    <a href="/servicios.html" class="nx-header-cta">
                        Solicitar soporte
                    </a>

                </div>

            </div>
        </div>
    `;

    initializeNavigation();
}

function initializeNavigation() {
    const toggle = document.getElementById("nx-menu-toggle");
    const navigation = document.getElementById("nx-navigation");

    if (!toggle || !navigation) return;

    function setMenuState(isOpen) {
        navigation.classList.toggle("is-open", isOpen);

        toggle.setAttribute("aria-expanded", String(isOpen));

        toggle.setAttribute(
            "aria-label",
            isOpen
                ? "Cerrar menú de navegación"
                : "Abrir menú de navegación"
        );
    }

    toggle.addEventListener("click", () => {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";

        setMenuState(!isOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            setMenuState(false);
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            const isOpen = toggle.getAttribute("aria-expanded") === "true";

            if (isOpen) {
                setMenuState(false);
                toggle.focus();
            }
        }
    });

    document.addEventListener("click", (event) => {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";

        if (
            isOpen &&
            !navigation.contains(event.target) &&
            !toggle.contains(event.target)
        ) {
            setMenuState(false);
        }
    });
}
