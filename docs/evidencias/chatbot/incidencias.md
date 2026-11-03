# Incidencias durante la validación de NEXO AI

## INC-01 - Respuesta HTTP 502 durante PR-10

**Escenario:** PR-10, consulta sobre disponibilidad inmediata.

**Contexto:** automatización visual con Playwright y backend desplegado en Cloudflare Workers.

**Comportamiento observado:** el Worker respondió HTTP 502 durante una ejecución del lote PR-06 a PR-20.

**Impacto:** no se generó la captura PR-10 en ese intento; el script detuvo la ejecución y conservó las capturas anteriores.

**Acción realizada:** se repitió el lote PR-06 a PR-10.

**Resultado posterior:** PR-10 devolvió HTTP 200, la respuesta apareció en la interfaz y se generó PR-10.png.

**Causa raíz:** no determinada. Podría estar relacionada con un fallo transitorio del Worker, la comunicación con Groq o el servicio externo.

**Clasificación:** incidencia técnica de disponibilidad, no fallo demostrado de las instrucciones del chatbot.

**Mejora pendiente:** incorporar registros estructurados y seguimiento de errores HTTP 5xx.

## INC-02 - Recursos CSS y JavaScript inaccesibles en InfinityFree

**Entorno:** WordPress autohospedado en InfinityFree.

**Componente:** plugin NEXOTECH AI Chat.

**Comportamiento observado:** determinados archivos CSS y JavaScript del plugin generaban respuestas HTTP 302 con redirección hacia una página de error HTTP 403.

**Impacto:** inicialmente, el shortcode de WordPress mostraba la estructura HTML del asistente, pero no se aplicaban correctamente los estilos ni se ejecutaba el JavaScript del chat.

**Diagnóstico realizado:**

- Se verificaron las rutas de los recursos en Chrome DevTools.
- Se comprobaron respuestas HTTP de diferentes archivos CSS y JavaScript.
- Algunos archivos de prueba eran accesibles desde los mismos directorios.
- Determinados archivos originales continuaban generando redirecciones hacia el error HTTP 403.
- No se identificó de manera concluyente la causa raíz.

**Acciones realizadas:**

1. Se dividió la hoja de estilos en dos archivos con límites válidos de reglas CSS.
2. Se publicaron como nexo-estilos-base.css y nexo-estilos-componentes.css.
3. Se publicó el JavaScript funcional como nexo-asistente.js.
4. Se actualizaron las referencias de recursos en el plugin WordPress.
5. Se vació la caché mediante W3 Total Cache.

**Resultado:** los nuevos recursos cargaron correctamente mediante HTTP 200. El asistente recuperó su presentación visual y su funcionalidad JavaScript.

**Validación adicional:** se confirmó una solicitud POST HTTP 200 desde WordPress hacia Cloudflare Workers, con el origen HTTPS de WordPress autorizado mediante CORS.

**Causa raíz:** no determinada.

**Estado:** resuelta funcionalmente mediante una configuración de archivos alternativa; pendiente investigar el origen exacto de las respuestas HTTP 403.
