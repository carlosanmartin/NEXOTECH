(function () {
    "use strict";

    var base = window.NexoCarritoBase;
    var panel = document.querySelector(".nx-cart-panel");
    if (!base || !panel) return;

    var status = panel.querySelector(".nx-cart-status");
    var lista = panel.querySelector(".nx-cart-items");
    var resumen = panel.querySelector(".nx-cart-summary");
    var api = panel.getAttribute("data-nx-cart-api");
    var storage;

    try {
        storage = window.localStorage;
        storage.getItem(base.clave);
    } catch (error) {
        status.textContent = "El almacenamiento del navegador no está disponible.";
        return;
    }

    function elemento(tipo, clase, texto) {
        var nodo = document.createElement(tipo);
        if (clase) nodo.className = clase;
        if (texto !== undefined) nodo.textContent = texto;
        return nodo;
    }

    function dinero(valor) {
        return "$" + new Intl.NumberFormat("es-CO").format(valor) + " COP";
    }

    function guardar(items) {
        if (!base.guardar(storage, items)) {
            status.textContent = "No se pudo guardar el cambio en este navegador.";
            return false;
        }
        return true;
    }

    function mostrar(items, productos) {
        lista.replaceChildren();
        resumen.replaceChildren();

        var porId = new Map(productos.map(function (producto) {
            return [producto.id, producto];
        }));
        var total = 0;
        var incompleto = false;

        items.forEach(function (item) {
            var producto = porId.get(item.id);
            var fila = elemento("article", "nx-cart-item");
            var detalle = elemento("div", "nx-cart-detail");
            var controles = elemento("div", "nx-cart-controls");

            if (producto && producto.imagen) {
                var imagen = document.createElement("img");
                imagen.src = producto.imagen;
                imagen.alt = "";
                imagen.loading = "lazy";
                fila.appendChild(imagen);
            } else {
                fila.appendChild(elemento("div", "", ""));
            }

            detalle.appendChild(elemento(
                "h2", "", producto ? producto.nombre : "Producto no disponible"
            ));

            if (producto && Number.isInteger(producto.precio_cop) &&
                producto.precio_cop >= 0) {
                total += producto.precio_cop * item.cantidad;
                detalle.appendChild(elemento(
                    "p", "", "Precio ilustrativo: " + dinero(producto.precio_cop)
                ));
            } else {
                incompleto = true;
                detalle.appendChild(elemento(
                    "p", "", producto ? "Consultar precio." : "Este producto ya no está disponible para consulta."
                ));
            }

            var etiqueta = elemento("label", "", "Cantidad");
            var cantidad = document.createElement("input");
            cantidad.type = "number";
            cantidad.min = "1";
            cantidad.max = "99";
            cantidad.step = "1";
            cantidad.value = String(item.cantidad);
            cantidad.setAttribute("aria-label", "Cantidad de " + (producto ? producto.nombre : "producto no disponible"));

            var actualizar = elemento("button", "", "Actualizar");
            actualizar.type = "button";
            actualizar.addEventListener("click", function () {
                var numero = Number(cantidad.value);
                var resultado = base.cambiarCantidad(base.leer(storage), item.id, numero);
                if (!resultado.ok) {
                    status.textContent = "Ingresa una cantidad entera entre 1 y 99.";
                    return;
                }
                if (guardar(resultado.items)) cargar();
            });

            var eliminar = elemento("button", "", "Eliminar");
            eliminar.type = "button";
            eliminar.setAttribute("aria-label", "Eliminar " + (producto ? producto.nombre : "producto no disponible"));
            eliminar.addEventListener("click", function () {
                if (guardar(base.eliminar(base.leer(storage), item.id))) cargar();
            });

            etiqueta.appendChild(cantidad);
            controles.append(etiqueta, actualizar, eliminar);
            fila.append(detalle, controles);
            lista.appendChild(fila);
        });

        resumen.textContent = incompleto
            ? "Total no disponible: hay productos sin precio o no disponibles."
            : "Total ilustrativo: " + dinero(total);

        status.textContent = "Revisa tu selección. Los precios y la disponibilidad deben confirmarse.";
    }

    async function cargar() {
        var items = base.leer(storage);
        lista.replaceChildren();
        resumen.replaceChildren();

        if (!items.length) {
            status.textContent = "Tu carrito está vacío.";
            return;
        }

        status.textContent = "Consultando productos...";

        try {
            var url = new URL(api, window.location.href);
            url.searchParams.set("ids", items.map(function (item) {
                return item.id;
            }).join(","));

            var respuesta = await fetch(url.toString(), {
                cache: "no-store",
                credentials: "same-origin"
            });

            if (!respuesta.ok) throw new Error("Consulta no disponible");
            var datos = await respuesta.json();

            if (!datos || !Array.isArray(datos.productos)) {
                throw new Error("Respuesta inválida");
            }

            mostrar(items, datos.productos);
        } catch (error) {
            status.textContent = "No se pudieron consultar los productos. Tu selección se conserva.";
            var reintentar = elemento("button", "nx-cart-retry", "Reintentar");
            reintentar.type = "button";
            reintentar.addEventListener("click", cargar);
            lista.replaceChildren(reintentar);
        }
    }

    cargar();
}());