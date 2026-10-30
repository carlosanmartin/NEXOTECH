<?php
/**
 * Plugin Name: NEXOTECH AI Chat
 * Description: Integración del asistente virtual NEXO AI con Cloudflare Workers.
 * Version: 1.0.1
 * Author: NEXOTECH
 * License: GPL-2.0-or-later
 * Text Domain: nexotech-ai-chat
 */

if (!defined('ABSPATH')) {
    exit;
}

define('NEXOTECH_AI_VERSION', '1.0.1');

function nexotech_ai_register_assets() {
    $base_url = plugin_dir_url(__FILE__);

    wp_register_style(
        'nexotech-ai-chat-base',
        $base_url . 'assets/css/nexo-estilos-base.css',
        array(),
        NEXOTECH_AI_VERSION
    );

    wp_register_style(
        'nexotech-ai-chat',
        $base_url . 'assets/css/nexo-estilos-componentes.css',
        array('nexotech-ai-chat-base'),
        NEXOTECH_AI_VERSION
    );

    wp_register_script(
        'nexotech-ai-chat',
        $base_url . 'assets/js/nexo-asistente.js',
        array(),
        NEXOTECH_AI_VERSION,
        true
    );
}
add_action('wp_enqueue_scripts', 'nexotech_ai_register_assets');

function nexotech_ai_render_chat() {
    wp_enqueue_style('nexotech-ai-chat');
    wp_enqueue_script('nexotech-ai-chat');

    ob_start();
    ?>

    <div class="nx-ai-page" data-nexotech-chat>

        <section class="nx-ai-intro">
            <div class="nx-chat-container">

                <span class="nx-section-label">
                    ASISTENTE INTELIGENTE
                </span>

                <h1>
                    Conoce a
                    <span class="nx-gradient-text">NEXO AI</span>
                </h1>

                <p>
                    Tu asistente virtual para descubrir productos,
                    servicios y soluciones tecnológicas de NEXOTECH.
                </p>

            </div>
        </section>

        <section class="nx-chat-container nx-chat-layout"
                 aria-label="Conversación con NEXO AI">

            <div class="nx-chat-panel">

                <div class="nx-chat-header">

                    <div class="nx-ai-avatar" aria-hidden="true">
                        N
                    </div>

                    <div>
                        <h2>NEXO AI</h2>
                        <span>Asistente virtual de NEXOTECH</span>
                    </div>

                    <span class="nx-ai-status"
                          aria-label="Asistente virtual"></span>

                </div>

                <div class="nx-chat-messages"
                     data-chat-messages
                     role="log"
                     aria-live="polite"
                     aria-relevant="additions">
                </div>

                <div class="nx-chat-suggestions"
                     aria-label="Preguntas sugeridas">

                    <button type="button"
                            data-question="¿Qué productos vende NEXOTECH?">
                        Productos
                    </button>

                    <button type="button"
                            data-question="¿Qué servicios técnicos ofrecen?">
                        Servicios técnicos
                    </button>

                    <button type="button"
                            data-question="¿Dónde está ubicado NEXOTECH?">
                        Ubicación
                    </button>

                    <button type="button"
                            data-question="¿Puedo solicitar productos bajo pedido?">
                        Pedidos especiales
                    </button>

                </div>

                <form class="nx-chat-form" data-chat-form>

                    <label class="nx-chat-label">
                        Escribe tu pregunta

                        <span class="nx-chat-input-row">

                            <input
                                type="text"
                                data-chat-input
                                maxlength="1000"
                                autocomplete="off"
                                placeholder="Pregúntale algo a NEXO AI..."
                                required
                            >

                            <button type="submit" data-chat-submit>
                                Enviar
                            </button>

                        </span>

                    </label>

                </form>

                <p class="nx-chat-disclaimer">
                    NEXO AI proporciona información orientativa.
                    Los precios académicos son ilustrativos.
                    La disponibilidad y las cotizaciones deben confirmarse.
                </p>

            </div>

        </section>

    </div>

    <?php
    return ob_get_clean();
}

add_shortcode('nexotech_ai_chat', 'nexotech_ai_render_chat');