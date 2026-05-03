# TP4: Calculadora de Amortización (Sistema Francés)

Este programa es una herramienta de línea de comandos (CLI) desarrollada en Python para calcular el cronograma de pagos de un préstamo utilizando el **Sistema de Amortización Francés**.

## 🚀 Características
- Cálculo de cuota fija mensual.
- Cálculo de Tasa Periódica y Tasa Efectiva Anual (TEA).
- Generación de tabla de amortización detallada.
- Resumen de totales (Pago total, Capital e Intereses).
- Arquitectura Orientada a Objetos (OOP).

## 🛠️ Tecnologías y Entorno
- **Lenguaje:** Python 3.x
- **Entorno:** Linux (Fedora/Arch)
- **Editor:** Zed
- **Gestor de Entorno:** venv (Python Virtual Environment)

## 📦 Instalación y Ejecución

1. Navegar a la carpeta del proyecto:
   ```bash
   cd tp4
    ```

2. Crear y activar el entorno virtual
   ```bash
   python -m venv .venv
   source .venv/bin/activate
    ```

3. Ejecutá la aplicación:
   ```bash
   python main.py
    ```

## 📐 Estructura del Código
- `loan_calculator.py`: Lógica financiera y fórmulas (Inglés).
- `cli_interface.py`: Interacción con el usuario y formato de salida (Inglés/Español).
- `main.py: Punto de entrada y orquestador del programa (Inglés).