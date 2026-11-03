<?php
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Datos publicos y vigentes para el carrito.
 * No crea pedidos ni modifica productos.
 */
function nexotech_carrito_registrar_api() {
    register_rest_route('nexotech/v1', '/carrito-productos', array(
        'methods' => 'GET',
        'callback' => 'nexotech_carrito_productos',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'nexotech_carrito_registrar_api');

function nexotech_carrito_productos($request) {
    $valor = $request->get_param('ids');

    if (!is_string($valor) || !preg_match('/^[0-9,]{1,549}$/D', $valor)) {
        return new WP_Error(
            'nexotech_ids_invalidos',
            'Envie entre 1 y 50 IDs numericos separados por comas.',
            array('status' => 400)
        );
    }

    $partes = explode(',', $valor);

    if (count($partes) > 50) {
        return new WP_Error(
            'nexotech_ids_invalidos',
            'Se permite un maximo de 50 IDs.',
            array('status' => 400)
        );
    }

    $ids = array();

    foreach ($partes as $parte) {
        if (!preg_match('/^[1-9][0-9]{0,9}$/D', $parte)) {
            return new WP_Error(
                'nexotech_ids_invalidos',
                'Los IDs deben ser numeros enteros positivos.',
                array('status' => 400)
            );
        }

        $id = (int) $parte;

        if ($id < 1 || (string) $id !== $parte) {
            return new WP_Error(
                'nexotech_ids_invalidos',
                'ID fuera del rango admitido.',
                array('status' => 400)
            );
        }

        $ids[$id] = $id;
    }

    $productos = array();

    foreach ($ids as $id) {
        $post = get_post($id);

        if (!$post || $post->post_type !== 'nx_producto' ||
            $post->post_status !== 'publish' || $post->post_password !== '') {
            continue;
        }

        $precio = get_post_meta($id, '_nx_precio_cop', true);
        $precio_valido = $precio !== '' &&
            preg_match('/^[0-9]{1,9}$/D', (string) $precio);

        $imagen = get_the_post_thumbnail_url($id, 'medium');

        $productos[] = array(
            'id' => $id,
            'nombre' => get_the_title($id),
            'url' => get_permalink($id),
            'imagen' => $imagen ? $imagen : null,
            'precio_cop' => $precio_valido ? (int) $precio : null,
        );
    }

    $respuesta = rest_ensure_response(array('productos' => $productos));
    $respuesta->header('Cache-Control', 'no-store, max-age=0');

    return $respuesta;
}