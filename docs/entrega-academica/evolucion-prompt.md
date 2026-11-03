# Evolución del prompt y ajustes técnicos de NEXO AI

## Diseño inicial

El prompt especializado se incorporó al proyecto mediante
el commit c7a8bc4 del 28 de octubre de 2026.

Desde su primera versión registrada estableció:

- Respuestas limitadas a NEXOTECH.
- Uso exclusivo de conocimiento autorizado.
- Prohibición de inventar datos comerciales.
- Rechazo de preguntas fuera de contexto.
- Protección de instrucciones internas.
- Resistencia frente a intentos de manipulación.
- Respuestas en español de máximo cuatro frases.

## Validación

Se ejecutaron 20 escenarios académicos:

- 10 consultas legítimas.
- 5 preguntas fuera de contexto.
- 3 intentos de manipulación.
- 2 consultas sobre información desconocida.

Los 20 escenarios fueron satisfactorios en la evaluación
documentada.

## Cambios al prompt

El historial de Git disponible registra una única versión
del archivo backend/prompts/nexo-ai-system.txt.

Por tanto, no se documentan modificaciones posteriores
al texto del prompt ni se inventa una comparación
antes/después.

## Ajustes técnicos realizados

Durante la implementación se incorporaron controles
de validación, CORS, limitación de peticiones,
manejo de errores e integración con WordPress.

También se resolvió funcionalmente una incidencia
de acceso a recursos CSS y JavaScript en InfinityFree.

Estos cambios mejoraron la implementación, pero no
constituyen modificaciones demostradas del prompt.

## Resultado

El chatbot fue integrado en WordPress y se confirmó
una solicitud POST HTTP 200 hacia Cloudflare Workers.

La integración conserva las restricciones comerciales
definidas para NEXO AI.