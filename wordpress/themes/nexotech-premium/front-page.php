<?php
if (!defined('ABSPATH')) {
    exit;
}
get_header();
?>
<main>


        <section class="hero">

            <div class="hero-glow"></div>

            <div class="container hero-content">

                <div class="hero-text">

                    <span class="badge">
                        INNOVACIÓN • TECNOLOGÍA • SOLUCIONES
                    </span>

                    <h1>
                        El futuro de la
                        <span class="gradient-text">tecnología</span>
                        comienza aquí.
                    </h1>

                    <p>
                        Descubre accesorios tecnológicos, soluciones
                        informáticas y soporte técnico en Cartagena.
                        En NEXOTECH conectamos tus necesidades
                        con la tecnología adecuada.
                    </p>

                    <div class="hero-actions">

                        <a href="#productos" class="btn btn-primary">
                            Explorar productos
                        </a>

                        <a href="#servicios" class="btn btn-secondary">
                            Solicitar soporte
                        </a>

                    </div>

                    <div class="hero-features">

                        <span>✓ Atención personalizada</span>
                        <span>✓ Soluciones tecnológicas</span>
                        <span>✓ Cartagena, Colombia</span>

                    </div>

                </div>

                <div class="hero-visual nx-hero-showcase" aria-hidden="true">

    <div class="nx-hero-light nx-light-blue"></div>
    <div class="nx-hero-light nx-light-purple"></div>

    <div class="nx-hero-grid"></div>

    <div class="nx-showcase-device">
        <img
            src="<?php echo esc_url(get_template_directory_uri() . '/assets/svg/nexotech-laptop.svg'); ?>"
            alt=""
            width="800"
            height="520"
        >
    </div>

    <div class="nx-showcase-card nx-card-performance">
        <span class="nx-card-indicator"></span>
        TECNOLOGÍA PREMIUM
    </div>

    <div class="nx-showcase-card nx-card-support">
        SOPORTE ESPECIALIZADO
    </div>

    <div class="nx-showcase-card nx-card-ai">
        NEXO AI
        <span>ASISTENCIA INTELIGENTE</span>
    </div>

</div>
            </div>
        </section>

        <section id="productos" class="section products-section">

            <div class="container">

                <div class="section-heading">

                    <span class="section-label">TECNOLOGÍA PARA TI</span>

                    <h2>
                        Explora nuestros
                        <span class="gradient-text">productos</span>
                    </h2>

                    <p>
                        Encuentra accesorios y componentes tecnológicos
                        para tus necesidades.
                    </p>

                </div>

                <div class="cards-grid">

                    <a class="product-card nx-home-card" href="<?php
    $termino = get_term_by('slug', 'perifericos', 'nx_categoria');
    $destino = $termino ? get_term_link($termino) : false;
    echo esc_url(($destino && !is_wp_error($destino)) ? $destino : (get_post_type_archive_link('nx_producto') ?: home_url('/productos/')));
?>">
    <span class="nx-home-photo" aria-hidden="true">
    <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/portada/perifericos.png'); ?>"
         alt="" width="1536" height="1024" loading="lazy">
</span>
    <h3>Periféricos</h3>
    <p>Teclados, mouse y accesorios para mejorar tu experiencia.</p>
    <span class="nx-home-card-action">Ver catálogo <span aria-hidden="true">→</span></span>
</a>

                    <a class="product-card nx-home-card" href="<?php
    $termino = get_term_by('slug', 'almacenamiento', 'nx_categoria');
    $destino = $termino ? get_term_link($termino) : false;
    echo esc_url(($destino && !is_wp_error($destino)) ? $destino : (get_post_type_archive_link('nx_producto') ?: home_url('/productos/')));
?>">
    <span class="nx-home-photo" aria-hidden="true">
    <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/portada/almacenamiento.png'); ?>"
         alt="" width="1536" height="1024" loading="lazy">
</span>
    <h3>Almacenamiento</h3>
    <p>Discos SSD, memorias USB y soluciones de almacenamiento.</p>
    <span class="nx-home-card-action">Ver catálogo <span aria-hidden="true">→</span></span>
</a>

                    <a class="product-card nx-home-card" href="<?php
    $termino = get_term_by('slug', 'audio-y-accesorios', 'nx_categoria');
    $destino = $termino ? get_term_link($termino) : false;
    echo esc_url(($destino && !is_wp_error($destino)) ? $destino : (get_post_type_archive_link('nx_producto') ?: home_url('/productos/')));
?>">
    <span class="nx-home-photo" aria-hidden="true">
    <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/portada/audio-accesorios.png'); ?>"
         alt="" width="1536" height="1024" loading="lazy">
</span>
    <h3>Audio y accesorios</h3>
    <p>Audífonos y accesorios para tus dispositivos.</p>
    <span class="nx-home-card-action">Ver catálogo <span aria-hidden="true">→</span></span>
</a>

                </div>

            </div>

        </section>

        <section id="servicios" class="section services-section">

            <div class="container">

                <div class="section-heading">

                    <span class="section-label">SOPORTE ESPECIALIZADO</span>

                    <h2>
                        Soluciones para tus
                        <span class="gradient-text">equipos</span>
                    </h2>

                    <p>
                        Servicios técnicos para computadores,
                        sistemas operativos y redes.
                    </p>

                </div>

                <div class="cards-grid">

                    <a class="service-card nx-home-card" href="#detalle-mantenimiento">
    <span class="nx-home-photo" aria-hidden="true">
    <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/portada/servicio-mantenimiento.png'); ?>"
         alt="" width="1536" height="1024" loading="lazy">
</span>
    <h3>Mantenimiento</h3>
    <p>Limpieza, diagnóstico y mantenimiento preventivo de computadores.</p>
    <span class="nx-home-card-action">Ver detalles <span aria-hidden="true">→</span></span>
</a>

                    <a class="service-card nx-home-card" href="#detalle-sistemas">
    <span class="nx-home-photo" aria-hidden="true">
    <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/portada/servicio-sistemas-nuevo.png'); ?>"
         alt="" width="1536" height="1024" loading="lazy">
</span>
    <h3>Sistemas operativos</h3>
    <p>Instalación, configuración y optimización de Windows.</p>
    <span class="nx-home-card-action">Ver detalles <span aria-hidden="true">→</span></span>
</a>

                    <a class="service-card nx-home-card" href="#detalle-redes">
    <span class="nx-home-photo" aria-hidden="true">
    <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/portada/servicio-redes.png'); ?>"
         alt="" width="1536" height="1024" loading="lazy">
</span>
    <h3>Redes</h3>
    <p>Configuración de redes y soluciones de conectividad.</p>
    <span class="nx-home-card-action">Ver detalles <span aria-hidden="true">→</span></span>
</a>

                </div>

            </div>

        </section>

        <section class="section nx-service-details" aria-labelledby="nx-detalles-titulo">
    <div class="container">
        <div class="section-heading">
            <span class="section-label">CONOCE NUESTROS SERVICIOS</span>
            <h2 id="nx-detalles-titulo">Soporte para tus equipos</h2>
            <p>Consulta el servicio que necesitas y sus condiciones.</p>
        </div>

        <div class="nx-service-detail-grid">
            <article id="detalle-mantenimiento" class="nx-service-detail">
                <h3>Mantenimiento</h3>
                <p>Limpieza, diagnóstico y mantenimiento preventivo de computadores.</p>
                <a href="<?php echo esc_url(home_url('/asistente-virtual/')); ?>">Consultar con NEXO AI →</a>
            </article>

            <article id="detalle-sistemas" class="nx-service-detail">
                <h3>Sistemas operativos</h3>
                <p>Instalación, configuración y optimización de Windows.</p>
                <a href="<?php echo esc_url(home_url('/asistente-virtual/')); ?>">Consultar con NEXO AI →</a>
            </article>

            <article id="detalle-redes" class="nx-service-detail">
                <h3>Redes</h3>
                <p>Configuración de redes y soluciones de conectividad.</p>
                <a href="<?php echo esc_url(home_url('/asistente-virtual/')); ?>">Consultar con NEXO AI →</a>
            </article>
        </div>
    </div>
</section>

        <section class="section ai-section">

            <div class="container ai-container">

                <div class="ai-content">

                    <span class="section-label">
                        INTELIGENCIA ARTIFICIAL
                    </span>

                    <h2>
                        Conoce a
                        <span class="gradient-text">NEXO AI</span>
                    </h2>

                    <p>
                        Nuestro asistente virtual te ayudará
                        a consultar productos, servicios y
                        obtener información sobre NEXOTECH.
                    </p>

                    <a href="<?php echo esc_url(home_url('/asistente-virtual/')); ?>" class="btn btn-primary">
                        Conocer NEXO AI
                    </a>

                </div>

                <div class="ai-orb" aria-hidden="true">
                    <span>AI</span>
                </div>

            </div>

        </section>


</main>
<?php get_footer(); ?>