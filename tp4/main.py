from loan_calculator import LoanCalculator
from cli_interface import CLIInterface

def main():
    interface = CLIInterface()
    interface.show_header()
    
    try:
        # Se obtienen los datos del usuario
        principal, tna, installments = interface.get_user_inputs()
        
        # Se inicializa la lógica
        calculator = LoanCalculator(principal, tna, installments)
        
        # Se realizan los cálculos
        periodic_rate = calculator.calculate_periodic_rate()
        tea = calculator.calculate_tea()
        monthly_payment = calculator.calculate_monthly_installment()
        schedule = calculator.generate_amortization_schedule()
        
        # Se muestran los resultados e indicadores
        interface.display_results(monthly_payment, periodic_rate, tea)
        
        # Se muestra la tabla
        interface.display_table(schedule)
        
        # Se calculan los totales y se muestran
        total_paid = sum(item['payment'] for item in schedule)
        total_capital = sum(item['capital'] for item in schedule)
        total_interest = sum(item['interest'] for item in schedule)
        
        print('\nTotales:')
        print(f'    Pago    : ${total_paid:,.2f}')
        print(f'    Capital : ${total_capital:,.2f}')
        print(f'    Interés : ${total_interest:,.2f}')
        
    except ValueError:
        print('\nError: Por favor, ingresá valores numéricos válidos.')
    except Exception as e:
        print(f'\nOcurrió un error inesperado: {e}')
        
if __name__ == '__main__':
    main()
        
