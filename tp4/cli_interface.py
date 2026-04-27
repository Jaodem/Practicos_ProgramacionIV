class CLIInterface:
    def show_header(self):
        print('=== Ingresá datos del préstamo ===')
        
    def get_user_inputs(self):
        principal = float(input('Monto inicial del préstamo : '))
        tna = float(input('Tasa Nominal Anual (TNA) : '))
        installments = int(input('Cantidad de cuotas mensuales  : '))
        return principal, tna, installments
        
    def display_results(self, fixed_payment, periodic_rate, tea):
        print('\n=== Resultados ===')
        print(f'Cuota fija (mensual)    : ${fixed_payment:.2f}')
        print(f'Tasa periódica (TNA/12) : {periodic_rate:.2%}')
        print(f'TEA (efectivo anual)    : {tea:.2%}')
        
    def display_table(self, schedule):
        print('\nCronograma de pagos:')
        header = f"{'Mes':>6} {'Pago':>10} {'Capital':>10} {'Interés':>10} {'Saldo':>10}"
        print(header)
        print('-' * len(header))
        
        for item in schedule:
            print(f"{item['month']:6d} "
                  f"${item['payment']:10.2f} "
                  f"${item['capital']:10.2f} "
                  f"${item['interest']:10.2f} "
                  f"${item['balance']:10.2f}")