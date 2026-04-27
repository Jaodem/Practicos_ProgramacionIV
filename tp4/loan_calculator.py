class LoanCalculator:
    def __init__(self, principal, annual_nominal_rate, total_installments):
        self.principal = principal
        self.annual_nominal_rate = annual_nominal_rate
        self.total_installments = total_installments
        
    def calculate_periodic_rate(self):
        return self.annual_nominal_rate / 12
        
    def calculate_tea(self):
        i = self.calculate_periodic_rate()
        return (1 + i) ** 12 - 1
        
    def calculate_monthly_installment(self):
        p = self.principal
        i = self.calculate_periodic_rate()
        n = self.total_installments
        
        # Fórmula: Cuota = P * (i * (1 + i)**n) / ((1 + i)**n - 1)
        numerator = i * (1 + i) ** n
        denominator = (1 + i) ** n -1
        
        return p * (numerator / denominator)
        
    def generate_amortization_schedule(self):
        schedule = []
        current_balance = self.principal
        monthly_payment = self.calculate_monthly_installment()
        periodic_rate = self.calculate_periodic_rate()
        
        for month in range(1, self.total_installments + 1):
            interest_paid = current_balance * periodic_rate
            capital_amortized = monthly_payment - interest_paid
            current_balance -= capital_amortized
            
            schedule.append({
                'month': month,
                'payment': monthly_payment,
                'capital': capital_amortized,
                'interest': interest_paid,
                'balance': max(0, current_balance) # Se evita números negativos
            })
            
        return schedule