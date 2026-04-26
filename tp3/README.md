# TP3 - Directorio Alumnos (React + Vite)

Este proyecto consiste en una aplicación web moderna para la visualización de un directorio de alumnos, desarrollada para la materia **Programación IV (2026)**. Representa el paso final en la evolución tecnológica de la cursada, migrando de JavaScript Vanilla a una arquitectura basada en componentes con **React** y un entorno de desarrollo de alto rendimiento con **Vite**.

## 🚀 Funcionalidades
- **Carga de Datos VCF**: Importación y parseo en tiempo real de archivos vCard 3.0 (`alumnos.vcf`) mediante expresiones regulares.
- **Búsqueda Avanzada**: Sistema de filtrado inteligente que ignora mayúsculas, minúsculas y acentos (normalización Unicode), buscando simultáneamente por nombre, legajo o teléfono.
- **Gestión de Favoritos**: Interacción fluida para marcar/desmarcar alumnos favoritos con persistencia en el estado de la sesión.
- **Agrupamiento y Orden**: Clasificación automática en dos secciones (Favoritos y Contactos), manteniendo un orden alfabético estricto por nombre normalizado.
- **Integración con GitHub**: Generación dinámica de avatares utilizando la API de imágenes de GitHub para usuarios con perfil disponible.
- **Privacidad (Data Masking)**: Implementación de seguridad para proteger la privacidad de los compañeros, ocultando parcialmente los números telefónicos.

## 🏗️ Arquitectura y Diseño
La aplicación sigue una estructura modular y escalable:
- **Separación de Concernimientos**:
    - `src/services/`: Lógica de extracción y transformación de datos (Parser VCF).
    - `src/utils/`: Funciones puras para normalización de texto y comparación de objetos.
    - `src/components/`: Componentes atómicos e independientes con estilos encapsulados.
- **Estado Global**: Manejo centralizado del estado mediante `useState` y efectos secundarios con `useEffect`.
- **UI/UX Moderno**: Diseño minimalista con una `Topbar` fija que utiliza efectos de desenfoque (*Glassmorphism*) y una grilla responsiva adaptativa.

## 🛠️ Tecnologías
- **Framework**: [React 18+](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Estilos**: CSS modularizado por componente.
- **Entorno de Desarrollo**: Linux (Fedora/Arch) + Editor Zed.

## 📦 Ejecución Local
1. Navegar a la carpeta: `cd tp3`
2. Instalar dependencias: `npm install`
3. Iniciar servidor de desarrollo: `npm run dev`
4. Abrir en el navegador: `http://localhost:5173`