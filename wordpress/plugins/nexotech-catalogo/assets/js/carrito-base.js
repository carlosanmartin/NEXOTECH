(function (root, factory) {
    if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        root.NexoCarritoBase = factory();
    }
}(typeof globalThis !== "undefined" ? globalThis : this, function () {
    "use strict";

    var CLAVE = "nexotech_carrito_v1";
    var MAX_PRODUCTOS = 50;
    var MAX_CANTIDAD = 99;

    function enteroValido(valor, maximo) {
        return Number.isSafeInteger(valor) && valor >= 1 && valor <= maximo;
    }

    function normalizar(datos) {
        if (!Array.isArray(datos)) return [];

        var resultado = [];
        var vistos = new Set();

        for (var i = 0; i < datos.length && resultado.length < MAX_PRODUCTOS; i++) {
            var item = datos[i];
            if (!item || typeof item !== "object") continue;

            if (!enteroValido(item.id, Number.MAX_SAFE_INTEGER) ||
                !enteroValido(item.cantidad, MAX_CANTIDAD) ||
                vistos.has(item.id)) {
                continue;
            }

            vistos.add(item.id);
            resultado.push({ id: item.id, cantidad: item.cantidad });
        }

        return resultado;
    }

    function leer(storage) {
        try {
            var valor = storage.getItem(CLAVE);
            return valor ? normalizar(JSON.parse(valor)) : [];
        } catch (error) {
            return [];
        }
    }

    function guardar(storage, datos) {
        try {
            storage.setItem(CLAVE, JSON.stringify(normalizar(datos)));
            if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
                window.dispatchEvent(new Event("nexotech:carrito-cambiado"));
            }
            return true;
        } catch (error) {
            return false;
        }
    }

    function agregar(datos, id, cantidad) {
        var items = normalizar(datos);

        if (!enteroValido(id, Number.MAX_SAFE_INTEGER) ||
            !enteroValido(cantidad, MAX_CANTIDAD)) {
            return { ok: false, items: items, motivo: "datos_invalidos" };
        }

        var existente = items.find(function (item) { return item.id === id; });

        if (existente) {
            if (existente.cantidad + cantidad > MAX_CANTIDAD) {
                return { ok: false, items: items, motivo: "cantidad_maxima" };
            }
            existente.cantidad += cantidad;
        } else {
            if (items.length >= MAX_PRODUCTOS) {
                return { ok: false, items: items, motivo: "carrito_lleno" };
            }
            items.push({ id: id, cantidad: cantidad });
        }

        return { ok: true, items: items };
    }

    function cambiarCantidad(datos, id, cantidad) {
        var items = normalizar(datos);

        if (!enteroValido(id, Number.MAX_SAFE_INTEGER) ||
            !enteroValido(cantidad, MAX_CANTIDAD)) {
            return { ok: false, items: items, motivo: "datos_invalidos" };
        }

        var item = items.find(function (actual) { return actual.id === id; });
        if (!item) return { ok: false, items: items, motivo: "no_encontrado" };

        item.cantidad = cantidad;
        return { ok: true, items: items };
    }

    function eliminar(datos, id) {
        return normalizar(datos).filter(function (item) {
            return item.id !== id;
        });
    }

    return {
        clave: CLAVE,
        normalizar: normalizar,
        leer: leer,
        guardar: guardar,
        agregar: agregar,
        cambiarCantidad: cambiarCantidad,
        eliminar: eliminar
    };
}));