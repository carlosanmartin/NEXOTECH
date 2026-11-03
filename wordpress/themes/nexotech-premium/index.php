<?php
if (!defined('ABSPATH')) {
    exit;
}
get_header();
?>
<main class="container section">
    <?php if (have_posts()) : ?>
        <?php while (have_posts()) : the_post(); ?>
            <article <?php post_class(); ?>>
                <h1><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
                <?php the_content(); ?>
            </article>
        <?php endwhile; ?>
        <?php the_posts_pagination(); ?>
    <?php else : ?>
        <p>No se encontró contenido.</p>
    <?php endif; ?>
</main>
<?php get_footer(); ?>