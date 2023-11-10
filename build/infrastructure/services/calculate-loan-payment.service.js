"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculateLoanPaymentService = void 0;
class CalculateLoanPaymentService {
    calcularDiasEntreDosFechas(startDate, endDate) {
        const difference = Math.abs((endDate).getTime() - (startDate).getTime());
        const convertToDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
        return convertToDays;
    }
    monthlyFee(params) {
        const installments = new Array(params.loanTerm).fill(params.loanInstallment);
        let maximunFee = 200000.00;
        let minimunFee = 0.00;
        let estimatedLoanInstalment = (maximunFee + minimunFee) / 2;
        let count = 0;
        while (true) {
            count++;
            let numberOfPayment = 0;
            let initialPrincipal = params.loanPrincipal;
            let finalPrincipal = 0.00;
            let startDate = new Date(params.startDate);
            let dueDate = new Date(params.firstDueDate);
            installments.forEach((rs, idx, arr) => {
                numberOfPayment++;
                let daysBetweenDates = this.calcularDiasEntreDosFechas(startDate, dueDate);
                let interest = ((1 + params.anualEffectiveRate) ** (daysBetweenDates / 360) - 1) * initialPrincipal;
                let principal = estimatedLoanInstalment - interest;
                finalPrincipal = initialPrincipal - principal;
                initialPrincipal = finalPrincipal;
                //console.log('Nro.', numberOfPayment, 'fec. ini.', startDate, 'fec. fin', dueDate, 'dias', daysBetweenDates, 'capital', principal, 'interes', interest, 'sal ini.', initialPrincipal, 'sal final', finalPrincipal)
                startDate = new Date(dueDate.getTime());
                dueDate.setMonth(dueDate.getMonth() + 1);
            });

            if (finalPrincipal > 0.00) {
                minimunFee = estimatedLoanInstalment;
            }
            else {
                maximunFee = estimatedLoanInstalment;
            };

            estimatedLoanInstalment = (maximunFee + minimunFee) / 2;

            if (Math.abs(finalPrincipal) < 0.25 || count > 70) break;
        }
        return +estimatedLoanInstalment.toFixed(2);
    }
}
exports.CalculateLoanPaymentService = CalculateLoanPaymentService;
