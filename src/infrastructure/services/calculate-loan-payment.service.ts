export class CalculateLoanPaymentService {
   private calcularDiasEntreDosFechas(startDate: Date, endDate: Date) {
      const difference: number = Math.abs((endDate).getTime() - (startDate).getTime())
      const convertToDays: number = Math.ceil(difference / (1000 * 60 * 60 * 24));

      return convertToDays;
   }

   public monthlyFee(params: {
      loanPrincipal: number,
      startDate: Date,
      firstDueDate: Date,
      loanInstallment: number,
      loanTerm: number,
      anualEffectiveRate: number,
      paymentFrecuency: string,
      businessDays: boolean,
      calculationType: string,
      scheduleType: string,
      typeVehicleInsurance: string,
      typeLifeInsurance: string,
      typeIGV: string,
   }): number {
      const installments = new Array(params.loanTerm).fill(params.loanInstallment);
      let maximunFee: number = 200000.00;
      let minimunFee: number = 0.00;
      let estimatedLoanInstalment: number = (maximunFee + minimunFee) / 2
      let count = 0;

      while (true) {
         count++;

         let numberOfPayment: number = 0;
         let initialPrincipal: number = params.loanPrincipal;
         let finalPrincipal: number = 0.00;
         let startDate: Date = new Date(params.startDate);
         let dueDate: Date = new Date(params.firstDueDate);

         installments.forEach((rs, idx, arr) => {
            numberOfPayment++;
            let daysBetweenDates = this.calcularDiasEntreDosFechas(startDate, dueDate);
            console.log("tea", (1 + params.anualEffectiveRate), "elavado", daysBetweenDates / 360)
            let interest = ((1 + params.anualEffectiveRate) ** (daysBetweenDates / 360) - 1) * initialPrincipal;
            let principal = estimatedLoanInstalment - interest;
            finalPrincipal = initialPrincipal - principal;
            initialPrincipal = finalPrincipal;
            console.log('Nro.', numberOfPayment, 'fec. ini.', startDate, 'fec. fin', dueDate, 'dias', daysBetweenDates, 'capital', principal, 'interes', interest, 'sal ini.', initialPrincipal, 'sal final', finalPrincipal)

            startDate = new Date(dueDate.getTime());
            dueDate.setMonth(dueDate.getMonth() + 1);
         })

         if (finalPrincipal > 0.00) {
            minimunFee = estimatedLoanInstalment;
         } else {
            maximunFee = estimatedLoanInstalment;
         };

         estimatedLoanInstalment = (maximunFee + minimunFee) / 2;

         if (Math.abs(finalPrincipal) < 0.25 || count > 50) break;
      }

      return estimatedLoanInstalment;
   }

}