import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
from data_manager import DataManager

# Se configura la página
st.set_page_config(page_title='Reporte de productos', layout='wide')

# Título y subtítulo de la página
st.title('Informe de Productos 📈')
st.caption('Métricas resumidas y evolución de precios/costos por año y mes.')

# Barra lateral para configuración
with st.sidebar:
    st.title('Configuración')
    # Selector de archivo CSV
    uploaded_file = st.file_uploader('Seleccioná un CSV', type=['csv'])
    
    if uploaded_file is not None:
        # Se carga el dataframe y la clase que se creó
        df = pd.read_csv(uploaded_file)
        dm = DataManager(df)
        
        # Selector de año
        years = dm.get_years()
        selected_year = st.selectbox('Seleccioná un año', years)            
    else:
        # Si no hay archivo, se muestra un mensaje y se detiene
        st.info('Subí un archivo CSV desde la barra lateral para comenzar.')
        st.stop()
        
# Se obtiene la lista de productos únicos
products = dm.get_products()

for product_name in products:
    # Se crea el contenedor con borde para cada producto
    with st.container(border=True):
        # Título del producto en rojo
        st.markdown(f'## :red[{product_name}]')
        
        # Se crea las dos columnas
        col_metrics, col_chart = st.columns([0.3, 0.7])
        
        with col_metrics:
            # Se traen los números desde el DataManager
            total_sales, avg_price, avg_cost = dm.get_summary_metrics(selected_year, product_name)
            
            st.metric("Cantidad de ventas", f"{int(total_sales):,}")
            st.metric("Precio promedio", f"${avg_price:,.2f}")
            st.metric("Costo promedio", f"${avg_cost:,.2f}")
            
        with col_chart:
            # Se obtiene los datos mensuales para el gráfico
            product_data = dm.get_filtered_data(selected_year, product_name)
            
            # Se crea la figura con el tamaño adecuado
            fig, ax = plt.subplots(figsize=(8, 3))
            
            # Línea de precio promedio
            ax.plot(product_data['mes'], product_data['unit_price'],
                label='Precio promedio', color='#1f77b4', marker='o')
            
            # Línea de costo promedio
            ax.plot(product_data['mes'], product_data['unit_cost'],
                label='Costo promedio', color='#d62728', marker='o')
            
            # Configuración de ejes y títulos
            ax.set_title('Evolución de precio y costo promedio')
            ax.set_xlabel('Mes')
            ax.set_ylabel('Monto')
            
            # Leyenda y cuadrícula
            ax.legend()
            ax.grid(True, linestyle='--', alpha=0.3)
            
            # Comando de Streamlit para mostrar la figura de Matplotlib
            st.pyplot(fig)