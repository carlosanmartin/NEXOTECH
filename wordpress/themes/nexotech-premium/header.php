<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header>
    <div class="nx-announcement">
        <div class="container">
            <span>TECNOLOGÍA • INNOVACIÓN • SOPORTE</span>
            <span>Cartagena, Colombia</span>
        </div>
    </div>

    <div class="nx-header-main">
        <div class="container nx-navbar">
            <a class="nx-brand" href="<?php echo esc_url(home_url('/')); ?>"
               aria-label="NEXOTECH Inicio">
                <span class="nx-brand-symbol">N</span>
                <span>NEXO<strong>TECH</strong></span>
            </a>

            <button class="nx-menu-toggle" type="button"
                    aria-label="Abrir menú de navegación"
                    aria-expanded="false" aria-controls="nx-navigation">
                <span></span><span></span><span></span>
            </button>

            <nav class="nx-navigation" id="nx-navigation"
                 aria-label="Navegación principal">
                <a href="<?php echo esc_url(home_url('/')); ?>">Inicio</a>
                <a href="<?php echo esc_url(get_post_type_archive_link('nx_producto') ?: home_url('/#productos')); ?>">Productos</a>
                <a href="<?php echo esc_url(home_url('/#servicios')); ?>">Servicios</a>
                <a href="<?php echo esc_url(home_url('/asistente-virtual/')); ?>">NEXO AI</a>

            </nav>

            <div class="nx-header-actions">
                <a class="nx-cart-button" href="<?php echo esc_url(home_url('/carrito/')); ?>"
                   aria-label="Abrir carrito">
                    <svg viewBox="0 0 24 24" width="26" height="26" fill="none"
                         stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                         stroke-linejoin="round" aria-hidden="true" focusable="false">
                        <circle cx="9" cy="20" r="1"></circle>
                        <circle cx="19" cy="20" r="1"></circle>
                        <path d="M2 3h2l2.4 11.1a2 2 0 0 0 2 1.6h10a2 2 0 0 0 1.9-1.4L22 7H5"></path>
                    </svg>
                    <span class="nx-cart-count" aria-hidden="true" hidden>0</span>
                </a>
                <a class="nx-header-cta"
                   href="<?php echo esc_url(home_url('/#servicios')); ?>">
                    Solicitar soporte
                </a>
            </div>
        </div>
    </div>
</header>