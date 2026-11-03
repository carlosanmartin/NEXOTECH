<?php
/**
 * Plugin Name: NEXOTECH Catálogo
 * Description: Estructura administrable de productos y categorías de NEXOTECH.
 * Version: 0.1.0
 * Author: NEXOTECH
 * License: GPL-2.0-or-later
 * Text Domain: nexotech-catalogo
 */

if (!defined('ABSPATH')) {
    exit;
}

function nexotech_catalogo_registrar_contenido() {
    register_post_type('nx_producto', array(
        'labels' => array(
            'name'          => 'Productos',
            'singular_name' => 'Producto',
            'add_new'       => 'Añadir producto',
            'add_new_item'  => 'Añadir producto',
            'edit_item'     => 'Editar producto',
            'not_found'     => 'No se encontraron productos.',
        ),
        'public'       => true,
        'show_in_rest' => true,
        'menu_icon'    => 'dashicons-products',
        'supports'     => array('title', 'editor', 'excerpt', 'thumbnail'),
        'has_archive'  => 'productos',
        'rewrite'      => array('slug' => 'producto', 'with_front' => false),
    ));

    register_taxonomy('nx_categoria', array('nx_producto'), array(
        'labels' => array(
            'name'          => 'Categorías de productos',
            'singular_name' => 'Categoría de producto',
            'add_new_item'  => 'Añadir categoría',
            'edit_item'     => 'Editar categoría',
        ),
        'public'       => true,
        'hierarchical' => true,
        'show_in_rest' => true,
        'rewrite'      => array('slug' => 'categoria-producto', 'with_front' => false),
    ));
}
add_action('init', 'nexotech_catalogo_registrar_contenido');

function nexotech_catalogo_activar() {
    nexotech_catalogo_registrar_contenido();
    flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'nexotech_catalogo_activar');

function nexotech_catalogo_desactivar() {
    unregister_post_type('nx_producto');
    unregister_taxonomy('nx_categoria');
    flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'nexotech_catalogo_desactivar');

/**
 * Precio opcional en pesos colombianos, almacenado como entero.
 */
function nexotech_catalogo_precio_metabox() {
    add_meta_box(
        'nexotech_precio',
        'Precio del producto',
        'nexotech_catalogo_precio_render',
        'nx_producto',
        'side',
        'default'
    );
}
add_action('add_meta_boxes', 'nexotech_catalogo_precio_metabox');

function nexotech_catalogo_precio_render($post) {
    $precio = get_post_meta($post->ID, '_nx_precio_cop', true);
    wp_nonce_field('nexotech_guardar_precio', 'nexotech_precio_nonce');
    ?>
    <label for="nexotech_precio_cop">Precio en COP</label>
    <input
        type="number"
        id="nexotech_precio_cop"
        name="nexotech_precio_cop"
        value="<?php echo esc_attr($precio); ?>"
        min="0"
        max="999999999"
        step="1"
        style="width:100%;"
    >
    <p>Ingrese pesos enteros sin puntos ni comas. Déjelo vacío para consultar precio.</p>
    <?php
}

function nexotech_catalogo_precio_guardar($post_id) {
    if (
        !isset($_POST['nexotech_precio_nonce']) ||
        !is_string($_POST['nexotech_precio_nonce'])
    ) {
        return;
    }

    $nonce = sanitize_text_field(wp_unslash($_POST['nexotech_precio_nonce']));
    if (!wp_verify_nonce($nonce, 'nexotech_guardar_precio')) {
        return;
    }

    if (
        (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) ||
        wp_is_post_revision($post_id) ||
        !current_user_can('edit_post', $post_id)
    ) {
        return;
    }

    if (
        !isset($_POST['nexotech_precio_cop']) ||
        !is_string($_POST['nexotech_precio_cop'])
    ) {
        return;
    }

    $valor = trim(wp_unslash($_POST['nexotech_precio_cop']));

    if ($valor === '') {
        delete_post_meta($post_id, '_nx_precio_cop');
        return;
    }

    // Rechazar valores inválidos sin sustituir el precio anterior.
    if (!preg_match('/^[0-9]{1,9}$/D', $valor)) {
        return;
    }

    update_post_meta($post_id, '_nx_precio_cop', (string) ((int) $valor));
}
add_action('save_post_nx_producto', 'nexotech_catalogo_precio_guardar');

require_once __DIR__ . '/carrito-api.php';

/**
 * Scripts del boton en las fichas de producto.
 */
function nexotech_carrito_cargar_boton() {
    if (!is_singular('nx_producto')) {
        return;
    }

    wp_enqueue_script(
        'nexotech-carrito-base',
        plugins_url('assets/js/carrito-base.js', __FILE__),
        array(),
        '0.1.0',
        true
    );

    wp_enqueue_script(
        'nexotech-carrito-boton',
        plugins_url('assets/js/carrito-boton.js', __FILE__),
        array('nexotech-carrito-base'),
        '0.1.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'nexotech_carrito_cargar_boton');
