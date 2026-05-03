# 🛒 Sistema de E-Commerce - Tejada Hnos (TP6)

Este proyecto es una plataforma integral de comercio electrónico desarrollada para el Trabajo Final de Programación IV (UTN-FRT). El sistema permite la gestión de un catálogo de productos, un carrito de compras con lógica impositiva dinámica y un historial detallado de transacciones.

## 🏗️ Arquitectura del Proyecto

El sistema está dividido en dos grandes módulos desacoplados que se comunican mediante una API REST:

- **Frontend**: SPA construida con Next.js 15, Tailwind CSS y Shadcn UI.
- **Backend**: API REST desarrollada con FastAPI, SQLModel y SQLite.

---

## 📂 Estructura del Repositorio
```text
tp6/
├── backend/     # API en Python (FastAPI + SQLModel)
└── frontend/    # Aplicación Web (Next.js + TypeScript)
```

---

## 🛠️ Tecnologías Utilizadas
#### Backend
* **FastAPI**: Framework de alto rendimiento para la API.
* **SQLModel**: ORM para la interacción con la base de datos SQLite.
* **Uvicorn**: Servidor ASGI de desarrollo.

#### Frontend
* **Next.js 15 (App Router)**: Framework de React para el renderizado y ruteo.
* **TypeScript**: Para garantizar la seguridad de tipos en toda la aplicación.
* **Shadcn UI & Tailwind**: Para una interfaz minimalista, reactiva y profesional.

---

## ⚙️ Reglas de Negocio Centrales
El sistema implementa lógica automatizada compartida entre ambos módulos:
1. **IVA Diferenciado**:
    * **Electrónica**: 10%
    * **Categorías Generales**: 21%
2. **Logística de Envíos**:
    * **Gratis**: En compras superiores a $1000.
    * **Costo Fijo**: $50 para compras menores o iguales a $1000.
3. **Gestión de Stock**: Sincronización en tiempo real. Al finalizar la compra, el stock se descuenta permanentemente del inventario.

---

## 🚀 Guía de Inicio Rápido
1. **Levantar el Backend**:
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```
La API estará disponible en `http://localhost:8000`.

2. **Levantar el Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
La aplicación web estará disponible en `http://localhost:3000`.

3. **Variables de Entorno**:

Asegurate de que el archivo `frontend/.env.local` apunte correctamente a tu backend de FastAPI:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```