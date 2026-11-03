<?php
if (!defined('ABSPATH')) {
    exit;
}

wp_enqueue_style(
    'nexotech-carrito-demo',
    get_template_directory_uri() . '/assets/css/carrito-demo.css',
    array('nexotech-theme-responsive'),
    '0.1.0'
);

if (function_exists('nexotech_carrito_productos')) {
    wp_enqueue_script(
        'nexotech-carrito-base',
        plugins_url('nexotech-catalogo/assets/js/carrito-base.js'),
        array(),
        '0.1.0',
        true
    );
    wp_enqueue_script(
        'nexotech-carrito-vista',
        plugins_url('nexotech-catalogo/assets/js/carrito-vista.js'),
        array('nexotech-carrito-base'),
        '0.1.0',
        true
    );
}

get_header();
?>
<main class="nx-cart container">
    <a class="nx-cart-back"
       href="<?php echo esc_url(get_post_type_archive_link('nx_producto') ?: home_url('/')); ?>">
        Volver al catálogo
    </a>

    <header class="nx-cart-intro">
        <span class="section-label">TU SELECCIÓN</span>
        <h1>Tu carrito</h1>
        <p>Revisa los productos que deseas consultar.</p>
    </header>

    <p class="nx-cart-brief">
        Imágenes ilustrativas · Disponibilidad por confirmar.
        El carrito aún no envía pedidos ni procesa pagos.
    </p>

    <section class="nx-cart-panel"
             aria-label="Productos del carrito"
             data-nx-cart-api="<?php echo esc_url(rest_url('nexotech/v1/carrito-productos')); ?>">
        <p class="nx-cart-status" role="status" aria-live="polite">
            Para ver tu selección, activa JavaScript y el almacenamiento del navegador.
        </p>
        <div class="nx-cart-items"></div>
        <div class="nx-cart-summary"></div>
    </section>
</main>
<?php get_footer(); ?>