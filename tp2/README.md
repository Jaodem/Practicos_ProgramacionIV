# TP2 - Agenda de Contactos (Web App)

Este proyecto consiste en una aplicación web interactiva para la gestión de contactos, desarrollada para la materia **Programación IV (2026)**. Representa una evolución del TP1, pasando de una interfaz de consola a una **Single Page Application (SPA)** moderna que utiliza manipulación dinámica del DOM y Programación Orientada a Objetos.

## 🚀 Funcionalidades
- **CRUD Completo**: Gestión total de contactos (Crear, Leer, Actualizar y Borrar) en tiempo real.
- **Interfaz Responsiva**: Diseño adaptativo utilizando **Pico.css**, optimizado para diferentes tamaños de pantalla mediante CSS Grid.
- **Búsqueda con Normalización**: Filtrado inteligente que ignora mayúsculas, minúsculas y acentos (diacríticos), permitiendo encontrar "López" buscando "lopez".
- **Ordenamiento Automático**: Los contactos se mantienen ordenados alfabéticamente por Apellido y Nombre de forma constante.
- **Validación de Datos**: Uso de formularios HTML5 con validaciones nativas y modales (`<dialog>`) para una experiencia de usuario fluida.

## 🏗️ Arquitectura y Diseño
La aplicación está construida bajo un esquema de separación de responsabilidades:
- **Lógica de Negocio (`ejercicio.js`)**: 
    - Clase `Contact`: Estructura los datos de cada entrada.
    - Clase `Agenda`: Gestiona el estado de los contactos, el filtrado y el ordenamiento mediante atributos privados (`#contacts`).
- **Capa de Presentación**: 
    - Función `render()`: Se encarga de transformar los objetos de JavaScript en elementos `<article>` del DOM.
    - **Delegación de Eventos**: Implementada en el contenedor principal para manejar acciones de edición y borrado de forma eficiente desde un único punto.
- **Estilos (`ejercicio.css`)**: Extensiones personalizadas sobre el framework Pico.css para el manejo de la grilla responsiva de tarjetas.

## 🛠️ Tecnologías
- **Lenguaje**: JavaScript (ES6+ / Modules)
- **Estilos**: [Pico.css](https://picocss.com/) (Minimalist CSS Framework)
- **Servidor de Desarrollo**: Python HTTP Server
- **Versionado**: Git

## 📦 Ejecución Local
Para previsualizar la aplicación correctamente (debido al uso de ES Modules):
1. Abrir una terminal en la carpeta del proyecto: `cd tp2`
2. Iniciar el servidor local:
   ```bash
   python3 -m http.server 8080
3. Abrir el navegador en: http://localhost:8080/ejercicio.html