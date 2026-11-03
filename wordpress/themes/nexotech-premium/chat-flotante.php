<?php
if (!defined('ABSPATH')) {
    exit;
}

function nexotech_flotante_disponible() {
    return !is_admin()
        && !is_page('asistente-virtual')
        && shortcode_exists('nexotech_ai_chat');
}

function nexotech_flotante_assets() {
    if (!nexotech_flotante_disponible()) {
        return;
    }

    $uri = get_template_directory_uri();

    // El plugin registra estos recursos en wp_enqueue_scripts.
    wp_enqueue_style('nexotech-ai-chat');
    wp_enqueue_script('nexotech-ai-chat');

    wp_enqueue_style(
        'nexotech-flotante',
        $uri . '/assets/css/nexo-flotante.css',
        array('nexotech-ai-chat'),
        '0.1.0'
    );

    wp_enqueue_script(
        'nexotech-flotante',
        $uri . '/assets/js/nexo-flotante.js',
        array('nexotech-ai-chat'),
        '0.1.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'nexotech_flotante_assets', 30);

function nexotech_flotante_render() {
    if (!nexotech_flotante_disponible()) {
        return;
    }
    ?>
    <div class="nx-float" data-nx-float>
        <section
            id="nexo-chat-flotante"
            class="nx-float-window"
            aria-label="Chat con NEXO AI"
            hidden
        >
            <div class="nx-float-top">
                <strong>NEXO AI</strong>
                <button type="button" class="nx-float-close"
                        data-nx-close aria-label="Cerrar chat">
                    &times;
                </button>
            </div>
            <?php echo do_shortcode('[nexotech_ai_chat]'); ?>
        </section>

        <button type="button" class="nx-float-toggle"
                data-nx-toggle aria-controls="nexo-chat-flotante"
                aria-expanded="false" aria-label="Abrir chat con NEXO AI">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <path d="M4 5h16v11H9l-5 4V5Z"
                      stroke="currentColor" stroke-width="1.8"
                      stroke-linejoin="round"/>
                <path d="M8 10h8M8 13h5"
                      stroke="currentColor" stroke-width="1.8"
                      stroke-linecap="round"/>
            </svg>
        </button>
    </div>
    <?php
}
add_action('wp_footer', 'nexotech_flotante_render', 20);