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
