export class CalculateLoanPaymentService {

   public monthlyFee(params: {
      loanPrincipal: number,
      startDate: Date,
      firstDueDate: Date,
      loanTerm: number,
      effectiveAnualRate: number,
      businessDays: boolean,
      calculationType: string,
      scheduleType: string,
      typeVehicleInsurance: string,
      typeLifeInsurance: string,
      typeIGV: string,
   }): number {
      console.log("params", params)
      const installments = new Array(params.loanTerm).fill(0.00);
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

            let interest = ((1 + params.effectiveAnualRate) ** (daysBetweenDates / 360) - 1) * initialPrincipal;
            let principal = estimatedLoanInstalment - interest;
            finalPrincipal = initialPrincipal - principal;
            initialPrincipal = finalPrincipal;

            // console.log('Nro.', numberOfPayment, 'fec. ini.', startDate, 'fec. fin', dueDate, 'dias', daysBetweenDates, 'capital', principal, 'interes', interest, 'sal ini.', initialPrincipal, 'sal final', finalPrincipal)

            startDate = new Date(dueDate.getTime());
            dueDate.setMonth(dueDate.getMonth() + 1);
         })

         if (finalPrincipal > 0.00) {
            minimunFee = estimatedLoanInstalment;
         } else {
            maximunFee = estimatedLoanInstalment;
         };

         estimatedLoanInstalment = (maximunFee + minimunFee) / 2;

         if (Math.abs(finalPrincipal) < 0.05 || count === 100) {
            // if (count === 100) {
            //    estimatedLoanInstalment = 0.00
            // }

            break;
         };
      }

      return +estimatedLoanInstalment.toFixed(2);
   }

   private calcularDiasEntreDosFechas(startDate: Date, endDate: Date) {
      const difference: number = Math.abs((endDate).getTime() - (startDate).getTime())
      const convertToDays: number = Math.ceil(difference / (1000 * 60 * 60 * 24));

      return convertToDays;
   }
}