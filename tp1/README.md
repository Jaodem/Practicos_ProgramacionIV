# TP1 - Agenda de Contactos (Node.js)

Este proyecto consiste en una aplicación de consola para la gestión de contactos, desarrollada como parte de la materia **Programación IV (2026)**. Se enfocó en la aplicación de **Programación Orientada a Objetos** y el uso de estándares modernos de JavaScript.

## 🚀 Funcionalidades
- **CRUD Completo**: Capacidad para Agregar, Listar, Editar y Borrar contactos.
- **Búsqueda Inteligente**: Filtrado por nombre, apellido, email o teléfono (insensible a mayúsculas).
- **Persistencia de Datos**: Los cambios se guardan automáticamente en un archivo local `agenda.json`.
- **Ordenamiento Compuesto**: La lista de contactos se organiza alfabéticamente por Apellido y, en caso de igualdad, por Nombre.
- **Validaciones**: Control de agenda vacía y protección contra la creación de contactos sin nombre o apellido.

## 🏗️ Arquitectura y Diseño
El código sigue una estructura modular y organizada:
- **Clase `Contact`**: Modela la entidad del contacto con métodos de representación de datos (`toString`, `displayData`).
- **Clase `Phonebook`**: Actúa como el controlador de la lógica de negocio (gestión de IDs, búsquedas y persistencia).
- **Módulo `io.js`**: Abstrae la complejidad de la entrada/salida (File System y Terminal) utilizando promesas de Node.js.
- **Persistencia**: Se implementó una lógica de "rehidratación" para convertir datos JSON planos en instancias de clase funcionales al cargar la aplicación.

## 🛠️ Tecnologías
- **Runtime**: Node.js
- **Módulos**: ES Modules (import/export)
- **APIs Nativas**: `fs/promises` para archivos y `readline/promises` para interacción por consola.

## 📦 Ejecución
1. Navegar a la carpeta: `cd tp1`
2. Ejecutar con: `node ejercicio.js`