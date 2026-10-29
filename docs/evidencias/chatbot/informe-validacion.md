# Informe de validación académica de NEXO AI

## Proyecto

NEXOTECH - Tecnología que conecta soluciones.

Asistente virtual: NEXO AI.

Tecnologías principales:
- Cloudflare Workers.
- Groq API.
- Modelo openai/gpt-oss-120b.
- JavaScript.
- Playwright.
- Vitest.

## Objetivo

Verificar que NEXO AI responda exclusivamente sobre
productos y servicios de NEXOTECH, respete las
instrucciones del negocio y no invente información
comercial desconocida.

## Metodología

Se definieron 20 escenarios académicos:

- 10 consultas legítimas.
- 5 preguntas fuera de contexto.
- 3 intentos de manipulación de instrucciones.
- 2 consultas sobre información no confirmada.

Los escenarios se ejecutaron inicialmente mediante
solicitudes HTTP al Worker desplegado.

Posteriormente, Playwright automatizó interacciones
reales desde la interfaz web del asistente y generó
una captura PNG por escenario.

## Resultados

Primera evaluación de respuestas HTTP:

- Consultas legítimas: 10 de 10 aprobadas.
- Fuera de contexto: 5 de 5 aprobadas.
- Manipulación: 3 de 3 aprobadas.
- Información desconocida: 2 de 2 aprobadas.

Total: 20 de 20 escenarios satisfactorios en la
primera evaluación.

Se generaron 20 capturas desde Chromium mediante
Playwright. El script comprobó respuestas HTTP 200
y verificó que el texto apareciera en la interfaz.

La revisión visual individual de todas las capturas
continúa pendiente.

## Hallazgos

1. El asistente mantiene su especialización comercial.
2. No confirmó descuentos introducidos mediante
   suplantación del administrador.
3. No reveló instrucciones internas en el escenario
   evaluado.
4. No inventó horarios ni WhatsApp oficiales.
5. Identificó los precios académicos como ilustrativos.
6. Algunas respuestas contienen formato Markdown,
   aunque la interfaz presenta texto plano.

## Incidencias

Durante una ejecución visual de PR-10 se observó
HTTP 502. Una ejecución posterior respondió HTTP 200.

La causa raíz no fue determinada.

Consultar:
docs/evidencias/chatbot/incidencias.md

## Limitaciones

Los resultados corresponden a escenarios específicos.
No garantizan inmunidad frente a todas las variantes
de prompt injection ni disponibilidad permanente.

Las respuestas pueden variar entre ejecuciones porque
se utiliza un modelo generativo.

Las capturas demuestran interacciones desde el
frontend local con el Worker público.

## Evidencias

- docs/pruebas.md
- docs/evidencias/chatbot/resultados.csv
- docs/evidencias/chatbot/evaluacion-academica.csv
- docs/evidencias/chatbot/PR-01.png a PR-20.png
- docs/evidencias/chatbot/incidencias.md
