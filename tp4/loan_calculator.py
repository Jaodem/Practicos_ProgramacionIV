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