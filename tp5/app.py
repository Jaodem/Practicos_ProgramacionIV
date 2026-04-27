import streamlit as st
import pandas as pd
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
            st.write('Espacio para el gráfico')