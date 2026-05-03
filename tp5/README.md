# TP5 - Análisis de Datos con Streamlit 📈

## Descripción
Esta aplicación web interactiva, desarrollada con **Streamlit**, permite visualizar y analizar datos de productos a partir de archivos CSV. El sistema genera informes automáticos con métricas clave y gráficos de evolución de precios y costos mensuales.

## Características
- **Carga Dinámica**: Permite subir cualquier archivo CSV que respete la estructura de datos definida.
- **Filtrado por Año**: Selección interactiva de años para visualizar datos específicos.
- **Métricas por Producto**: Cálculo automático de ventas totales, precio promedio y costo promedio.
- **Visualización Avanzada**: Gráficos de líneas con Matplotlib que muestran la evolución mensual de precios vs. costos.
- **Diseño Responsivo**: Interfaz optimizada con diseño ancho y contenedores organizados.

## Tecnologías Utilizadas
- **Python 3.x**
- **Streamlit**: Framework para la interfaz web.
- **Pandas**: Procesamiento y análisis de datos.
- **Matplotlib**: Generación de visualizaciones gráficas.

## Estructura del Proyecto
- `app.py`: Punto de entrada de la aplicación y lógica de la interfaz.
- `data_manager.py`: Clase `DataManager` encargada del procesamiento lógico y cálculos con Pandas.
- `data/`: Carpeta contenedora de los archivos CSV de prueba (`gaseosas.csv`, `vinos.csv`).

## Instalación y Ejecución

1. **Clonar el repositorio**:
   ```bash
   git clone <url-de-tu-repo>
   cd Practicos_ProgramacionIV/tp5
    ```

2. **Configurar el entorno virtual**:
   ```bash
   python -m venv .venv
   source .venv/bin/activate    # En Linux
    ```

3. **Instalar dependencias**:
   ```bash
   pip install streamlit pandas matplotlib
    ```

4. **Ejecutar la aplicación**:
   ```bash
   streamlit run app.py
    ```