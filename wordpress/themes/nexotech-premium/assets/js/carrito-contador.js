(function () {
    "use strict";

    var enlace = document.querySelector(".nx-cart-button");
    var cuenta = enlace && enlace.querySelector(".nx-cart-count");
    var base = window.NexoCarritoBase;

    if (!enlace || !cuenta || !base) return;

    function actualizar() {
        try {
            var total = base.leer(window.localStorage).length;
            cuenta.textContent = String(total);
            cuenta.hidden = total === 0;
            enlace.setAttribute(
                "aria-label",
                "Abrir carrito: " + total +
                (total === 1 ? " producto diferente" : " productos diferentes")
            );
        } catch (error) {
            cuenta.hidden = true;
            enlace.setAttribute("aria-label", "Abrir carrito");
        }
    }

    window.addEventListener("nexotech:carrito-cambiado", actualizar);
    window.addEventListener("storage", function (evento) {
        if (evento.key === base.clave || evento.key === null) actualizar();
    });
    actualizar();
}());