# NEXOTECH - Arquitectura del sistema

## 1. Vision general

NEXOTECH utilizara una arquitectura web basada
en separacion de responsabilidades.

El frontend gestionara la experiencia del usuario.

El backend procesara las solicitudes relacionadas
con inteligencia artificial.

El proveedor de IA generara respuestas utilizando
el contexto autorizado del negocio.

## 2. Componentes

### Frontend

Tecnologias:

- HTML5
- CSS3
- JavaScript

Responsabilidades:

- Presentar productos.
- Mostrar servicios.
- Gestionar el carrito.
- Facilitar contacto por WhatsApp.
- Mostrar la interfaz del chatbot.

### Backend

Tecnologia inicial:

Cloudflare Workers.

Responsabilidades:

- Recibir solicitudes del chatbot.
- Validar entradas.
- Gestionar errores.
- Proteger credenciales.
- Comunicarse con Groq.
- Aplicar controles de seguridad.

### Inteligencia artificial

Proveedor inicial:

Groq API.

Asistente:

NEXO AI.

Responsabilidades:

- Responder consultas comerciales.
- Consultar el conocimiento autorizado.
- Mantener el tono de marca.
- Rechazar consultas fuera de contexto.

## 3. Flujo del chatbot

Cliente
   |
   v
Frontend NEXOTECH
   |
   v
Cloudflare Worker
   |
   v
Groq API
   |
   v
Respuesta controlada
   |
   v
Cliente

## 4. Seguridad

- Credenciales almacenadas como secretos.
- Validacion de solicitudes.
- Limitacion de longitud de mensajes.
- Restricciones de contexto.
- Manejo seguro de errores.
- Control de abuso mediante limites de solicitudes.
- Uso de HTTPS.

## 5. Base de datos

PostgreSQL se considera una integracion futura.

No es necesaria para el funcionamiento inicial
del chatbot ni del carrito local.

## 6. Integracion con WordPress

El frontend se desarrollara inicialmente
de forma independiente.

Posteriormente se adaptara para su
publicacion en WordPress.

La estrategia definitiva de integracion
dependera del entorno de alojamiento disponible.

## 7. Escalabilidad

La arquitectura permitira incorporar
posteriormente:

- Panel administrativo.
- Gestion de inventario.
- Base de datos.
- Autenticacion.
- Seguimiento de pedidos.
- Analitica comercial.

Estas funcionalidades no forman parte
del alcance inicial.
