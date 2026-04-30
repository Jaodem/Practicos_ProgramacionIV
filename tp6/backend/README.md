# E-Commerce API - Backend Python

Este módulo contiene la lógica del servidor, persistencia de datos y reglas de negocio para el Trabajo Final de Programación IV (UTN-FRT).

## 🛠️ Tecnologías y Entorno
* **Lenguaje**: Python
* **Framework**: FastAPI
* **ORM**: SQLModel (SQLAlchemy + Pydantic)
* **Base de Datos**: SQLite
* **Servidor**: Uvicorn

## 🚀 Instalación (Linux/Fedora)

1. **Entorno Virtual**:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
    ```

2. **Dependencias**:
   ```bash
   pip install -r requirements.txt
    ```

3. **Ejecución**:
   ```bash
   uvicorn app.main:app --reload
    ```

## ⚙️ Reglas de Negocio Implementadas

### Gestión de IVA Diferenciado
El sistema calcula automáticamente los impuestos según la categoría del producto:
* **Electrónica**: 10% de IVA.
* **General (Ropa/Joyería)**: 21% de IVA.

### Logística y Envío
* **Envío Gratis**: Aplicado automáticamente en pedidos superiores a $1000.
* **Costo Fijo**: Se recargan $50 en pedidos iguales o menores a $1000.

### Control de Inventario
* **Validación**: No se permite añadir al carrito más unidades de las disponibles en stock.
* **Sincronización**: Al confirmar la compra (checkout), se descuentan las unidades correspondientes de la tabla de productos de forma permanente.

## 📌 Endpoints de la API

### Productos
* **GET `/products`**: Listado completo.
* **GET `/products/{id}`**: Detalle individual.

### Carrito
* **GET `/cart/`**: Estado actual, desglose de IVA y envío.
* **POST `/cart/add/{product_id}`**: Agregar/incrementar producto.
* **DELETE `/cart/remove/{product_id}`**: Restar/eliminar producto.
* **POST `/cart/cancel`**: Vaciar carrito actual.
* **POST `/cart/checkout`**: Finalizar venta y registrar historial.

### Historial
* **GET `/cart/history`**: Registro de todas las compras finalizadas del usuario.