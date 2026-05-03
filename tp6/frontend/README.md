# 🛒 TP6 Shop - Frontend

Este es el frontend de la plataforma de gestión de ventas y catálogo de productos "Tejada Hnos". La aplicación está construida con **Next.js 15**, utilizando una arquitectura de componentes modulares y un sistema de diseño basado en **Shadcn UI** y **Tailwind CSS**.

## 🚀 Tecnologías Principales

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Lenguaje**: TypeScript (Tipado estricto)
- **Estilos**: Tailwind CSS + Shadcn UI (Componentes Radix UI)
- **Iconografía**: Lucide React
- **Gestión de Fechas**: `date-fns` para formateo localizado (es-AR)
- **Notificaciones**: Sonner (Toasts)

## ✨ Características Implementadas

### 1. Catálogo Dinámico y Filtros
- Renderizado de productos con stock actualizado en tiempo real.
- **Sistema de Búsqueda**: Filtrado contextual por contenido de texto y categorías (Electrónica, Joyería, Ropa).
- El buscador es inteligente: solo se muestra en la vista principal de productos.

### 2. Gestión de Carrito (Context API)
- Carrito persistente mediante `CartContext`.
- Sidebar interactivo con cálculo automático de:
  - Subtotal.
  - IVA diferenciado (10% Electrónica, 21% General).
  - Costo de envío (Dinámico: $50 si el total < $1000, gratis superando ese monto).

### 3. Historial de Compras
- Vista detallada de compras anteriores.
- Diseño de dos columnas: listado con scroll independiente y panel de detalle tipo "ticket".
- Integración con el backend para recuperar detalles precisos de productos comprados, direcciones y métodos de pago (simulados).

## 🛠️ Configuración para Desarrollo

Como este proyecto utiliza componentes de **Shadcn UI**, asegurate de tener las dependencias instaladas.

1. **Instalar dependencias**:
   ```bash
   npm install
    ```

2. **Levantar el servidor de desarrollo**:
   ```bash
   npm run dev
    ```

3. **Variables de entorno**:
  Asegurate de que el archivo `.env.local` apunte correctamente a tu backend de FastAPI:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000
    ```

## 📂 Estructura del Proyecto
- `src/app/`: Rutas principales (`/`, `/purchase`, `/checkout`).
- src/components/`:
  - `filters/`: Componentes de búsqueda y selección.
  - `products/`: Cards y listados de productos.
  - `cart/`: Lógica de la barra lateral y gestión de items.
  - `ui/`: Componentes base de Shadcn (Input, Select, Button, Card, etc.).
- `src/context/`: Proveedores de estado global (`AuthContext`, `CartContext`).
- src/services/`: Capa de abstracción para peticiones a la API (FastAPI).

## 🎨 Tematización
El entorno de desarrollo está optimizado para una visualización clara y profesional. Se han reforzado los contrastes de bordes (`border-slate-300`) y sombras para garantizar una jerarquía visual coherente en todas las resoluciones.
