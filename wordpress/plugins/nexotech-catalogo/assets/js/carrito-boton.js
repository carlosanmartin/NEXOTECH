(function () {
    "use strict";

    var base = window.NexoCarritoBase;
    var boton = document.querySelector("[data-nx-add-product]");
    var mensaje = document.querySelector(".nx-product-cart-message");

    if (!base || !boton || !mensaje) return;

    var id = Number(boton.getAttribute("data-nx-add-product"));

    if (!Number.isSafeInteger(id) || id < 1) {
        mensaje.textContent = "No se pudo identificar el producto.";
        return;
    }

    boton.disabled = false;
    mensaje.textContent = "La selección se guarda en este navegador.";

    boton.addEventListener("click", function () {
        try {
            var storage = window.localStorage;
            var resultado = base.agregar(base.leer(storage), id, 1);

            if (!resultado.ok) {
                mensaje.textContent = resultado.motivo === "cantidad_maxima"
                    ? "Se alcanzó la cantidad máxima para este producto."
                    : "No se pudo agregar el producto. Revisa el límite del carrito.";
                return;
            }

            if (!base.guardar(storage, resultado.items)) {
                mensaje.textContent = "No se pudo guardar el carrito en este navegador.";
                return;
            }

            mensaje.textContent = "Producto añadido al carrito.";
        } catch (error) {
            mensaje.textContent = "El almacenamiento del navegador no está disponible.";
        }
    });
}());