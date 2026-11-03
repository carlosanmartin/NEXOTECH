<?php
if (!defined('ABSPATH')) {
    exit;
}

function nexotech_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'gallery', 'caption', 'style', 'script'));
}
add_action('after_setup_theme', 'nexotech_theme_setup');

function nexotech_theme_assets() {
    $uri = get_template_directory_uri();
    $version = '0.1.2';
    $styles = array(
        'design-system',
        'styles',
        'header',
        'hero-premium',
        'components',
        'responsive',
    );

    $previous = array();
    foreach ($styles as $style) {
        $handle = 'nexotech-theme-' . $style;
        wp_enqueue_style(
            $handle,
            $uri . '/assets/css/' . $style . '.css',
            $previous,
            $version
        );
        $previous = array($handle);
    }

    wp_enqueue_script(
        'nexotech-theme-navigation',
        $uri . '/assets/js/navigation.js',
        array(),
        $version,
        true
    );
}
add_action('wp_enqueue_scripts', 'nexotech_theme_assets');

/* Contador de productos diferentes en el carrito. */
function nexotech_theme_carrito_contador() {
    if (!function_exists('nexotech_carrito_productos')) {
        return;
    }

    wp_enqueue_script(
        'nexotech-carrito-base',
        plugins_url('nexotech-catalogo/assets/js/carrito-base.js'),
        array(),
        '0.1.1',
        true
    );

    wp_enqueue_script(
        'nexotech-carrito-contador',
        get_template_directory_uri() . '/assets/js/carrito-contador.js',
        array('nexotech-carrito-base'),
        '0.1.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'nexotech_theme_carrito_contador', 20);


require_once get_template_directory() . '/chat-flotante.php';
