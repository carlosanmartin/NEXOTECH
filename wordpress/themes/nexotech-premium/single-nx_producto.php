<?php
if (!defined('ABSPATH')) {
    exit;
}

wp_enqueue_style(
    'nexotech-producto-demo',
    get_template_directory_uri() . '/assets/css/producto-demo.css',
    array('nexotech-theme-responsive'),
    '0.1.0'
);

get_header();
?>
<main class="nx-product container">
    <?php if (have_posts()) : ?>
        <?php while (have_posts()) : the_post(); ?>
            <?php
            $precio = get_post_meta(get_the_ID(), '_nx_precio_cop', true);
            $catalogo = get_post_type_archive_link('nx_producto');
            ?>
            <a class="nx-product-back" href="<?php echo esc_url($catalogo ?: home_url('/')); ?>">
                ← Volver al catálogo
            </a>

            <article <?php post_class('nx-product-layout'); ?>>
                <div class="nx-product-image">
                    <?php if (has_post_thumbnail()) : ?>
                        <?php the_post_thumbnail('large'); ?>
                    <?php else : ?>
                        <span>Imagen próximamente</span>
                    <?php endif; ?>
                </div>

                <div class="nx-product-info">
                    <span class="section-label">PRODUCTO DE DEMOSTRACIÓN</span>
                    <h1><?php the_title(); ?></h1>

                    <p class="nx-product-price">
                        <?php
                        if ($precio !== '' && preg_match('/^[0-9]{1,9}$/D', (string) $precio)) {
                            echo esc_html('$' . number_format((int) $precio, 0, ',', '.') . ' COP');
                        } else {
                            echo 'Consultar precio';
                        }
                        ?>
                    </p>

                    <p class="nx-product-brief">
                        Imagen generada con IA y precio ilustrativo.
                        Disponibilidad por confirmar.
                    </p>

                    <div class="nx-product-description">
                        <?php the_content(); ?>
                    </div>

                    <div class="nx-product-cart">
                        <button
                            type="button"
                            class="nx-product-add"
                            data-nx-add-product="<?php echo esc_attr(get_the_ID()); ?>"
                            disabled
                        >Añadir al carrito</button>
                        <a class="nx-product-cart-link" href="<?php echo esc_url(home_url('/carrito/')); ?>">Ver carrito</a>
                        <p class="nx-product-cart-message" role="status" aria-live="polite">
                            El carrito necesita JavaScript.
                        </p>
                    </div>

                    <p class="nx-product-consult">Disponibilidad bajo consulta y por pedido.</p>
                </div>
            </article>
        <?php endwhile; ?>
    <?php else : ?>
        <p>No se encontró el producto.</p>
    <?php endif; ?>
</main>
<?php get_footer(); ?>