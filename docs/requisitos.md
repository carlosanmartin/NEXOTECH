# NEXOTECH - Especificacion de requisitos

## 1. Descripcion general

NEXOTECH es una plataforma web de comercializacion de
accesorios tecnologicos y prestacion de servicios informaticos.

El negocio opera en Cartagena, Colombia.

## 2. Objetivo general

Desarrollar una plataforma web moderna que permita
consultar productos, solicitar servicios tecnicos y
recibir asistencia virtual mediante inteligencia artificial.

## 3. Actores

### Cliente

Persona interesada en adquirir productos tecnologicos
o contratar servicios informaticos.

### Administrador

Responsable de gestionar el negocio, productos,
servicios y solicitudes comerciales.

### Asistente virtual

Sistema de inteligencia artificial especializado
en responder consultas sobre NEXOTECH.

## 4. Requisitos funcionales

RF-001: El sistema debe mostrar informacion del negocio.

RF-002: El sistema debe presentar un catalogo de productos.

RF-003: El usuario debe poder consultar productos por categoria.

RF-004: El sistema debe mostrar los servicios tecnicos disponibles.

RF-005: El usuario debe poder agregar productos al carrito.

RF-006: El usuario debe poder modificar cantidades del carrito.

RF-007: El usuario debe poder eliminar productos del carrito.

RF-008: El sistema debe permitir solicitar pedidos por WhatsApp.

RF-009: El usuario debe poder consultar al asistente NEXO AI.

RF-010: El chatbot debe responder sobre productos y servicios.

RF-011: El chatbot debe rechazar consultas fuera del negocio.

RF-012: El chatbot no debe inventar precios ni disponibilidad.

RF-013: El sistema debe informar cuando un producto es bajo pedido.

RF-014: El sistema debe permitir solicitar soporte tecnico.

RF-015: La interfaz debe funcionar en dispositivos moviles.

## 5. Requisitos no funcionales

RNF-001: La aplicacion debe utilizar HTTPS en produccion.

RNF-002: Las claves privadas deben permanecer en el backend.

RNF-003: El sistema debe validar los datos recibidos.

RNF-004: La interfaz debe ser responsive.

RNF-005: El codigo debe mantenerse organizado y documentado.

RNF-006: El sistema debe manejar errores de conectividad.

RNF-007: El chatbot debe mantener su contexto comercial.

RNF-008: El proyecto debe utilizar control de versiones Git.

RNF-009: El frontend debe considerar accesibilidad web.

RNF-010: El sistema debe evitar almacenar datos innecesarios.

## 6. Restricciones

- No se implementaran pagos en linea inicialmente.
- No se utilizaran credenciales en el frontend.
- La integracion final debe contemplar WordPress.
- El chatbot utilizara informacion definida del negocio.
- Los precios publicados deben identificarse correctamente.

## 7. Alcance de la primera version

La primera version incluira:

- Pagina principal.
- Catalogo inicial.
- Servicios tecnicos.
- Carrito de compras.
- Integracion con WhatsApp.
- Chatbot NEXO AI.
- Pruebas funcionales y de seguridad.
