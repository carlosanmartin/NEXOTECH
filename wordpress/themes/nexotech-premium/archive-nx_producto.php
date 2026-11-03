<?php
if (!defined('ABSPATH')) {
    exit;
}

wp_enqueue_style(
    'nexotech-catalogo-demo',
    get_template_directory_uri() . '/assets/css/catalogo-demo.css',
    array('nexotech-theme-responsive'),
    '0.1.0'
);

get_header();
?>
<main class="nx-store container">
    <header class="nx-store-intro">
        <span class="section-label">CATÁLOGO TECNOLÓGICO</span>
        <?php if (is_tax('nx_categoria')) : ?>
            <h1>Productos: <span class="gradient-text"><?php echo esc_html(single_term_title('', false)); ?></span></h1>
            <p><a href="<?php echo esc_url(get_post_type_archive_link('nx_producto') ?: home_url('/productos/')); ?>">← Ver catálogo completo</a></p>
        <?php else : ?>
            <h1>Explora nuestros <span class="gradient-text">productos</span></h1>
        <?php endif; ?>
        <p>Accesorios y soluciones tecnológicas bajo consulta y por pedido.</p>
    </header>

    <?php if (have_posts()) : ?>
        <div class="nx-store-grid">
            <?php while (have_posts()) : the_post(); ?>
                <?php $precio = get_post_meta(get_the_ID(), '_nx_precio_cop', true); ?>
                <article <?php post_class('nx-store-card'); ?>>
                    <a class="nx-store-image" href="<?php the_permalink(); ?>">
                        <?php if (has_post_thumbnail()) : ?>
                            <?php the_post_thumbnail('medium_large'); ?>
                        <?php else : ?>
                            <span>Imagen próximamente</span>
                        <?php endif; ?>
                    </a>

                    <div class="nx-store-info">
                        <h2>
                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        </h2>

                        <?php if (has_excerpt()) : ?>
                            <p><?php echo esc_html(get_the_excerpt()); ?></p>
                        <?php endif; ?>

                        <p class="nx-store-price">
                            <?php
                            if ($precio !== '' && preg_match('/^[0-9]{1,9}$/D', (string) $precio)) {
                                echo esc_html('$' . number_format((int) $precio, 0, ',', '.') . ' COP');
                            } else {
                                echo 'Consultar precio';
                            }
                            ?>
                        </p>

                        <small>Imágenes y precios ilustrativos · Disponibilidad bajo consulta</small>
                        <a class="nx-store-link" href="<?php the_permalink(); ?>">Ver detalle →</a>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>
        <?php the_posts_pagination(); ?>
    <?php else : ?>
        <p>Aún no hay productos publicados.</p>
    <?php endif; ?>
</main>
<?php get_footer(); ?>