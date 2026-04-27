import pandas as pd

class DataManager:
    def __init__(self, dataframe):
        self.df = dataframe
        self._calculate_averages()
        
    def _calculate_averages(self):
        self.df['unit_price'] = self.df['ingreso'] / self.df['cantidad']
        self.df['unit_cost'] = self.df['costo'] / self.df['cantidad']
        
    def get_years(self):
        return sorted(self.df['año'].unique())
    
    def get_products(self):
        return sorted(self.df['producto'].unique())
        
    def get_filtered_data(self, year, product_name):
        mask = (self.df['año'] == year) & (self.df['producto'] == product_name)
        return self.df[mask].sort_values('mes')
        
    def get_summary_metrics(self, year, product_name):
        filtered_df = self.get_filtered_data(year, product_name)
        
        total_sales = filtered_df['cantidad'].sum()
        
        avg_price = filtered_df['unit_price'].mean()
        avg_cost = filtered_df['unit_cost'].mean()
        
        return total_sales, avg_price, avg_cost