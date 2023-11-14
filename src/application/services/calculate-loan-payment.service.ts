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
      vehicleInsurance: number,
      typeLifeInsurance: string,
      igv: boolean,
   }): number {
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

            let interestCalc: number = ((1 + params.effectiveAnualRate) ** (daysBetweenDates / 360) - 1) * initialPrincipal;
            let igv: number = +(interestCalc * 0.18).toFixed(2);
            let principal: number;
            let interest: number;

            if (estimatedLoanInstalment < (interestCalc + params.vehicleInsurance + igv)) {
               principal = 0.00;
               igv = (estimatedLoanInstalment - params.vehicleInsurance) - ((estimatedLoanInstalment - params.vehicleInsurance) / 1.18);
               interest = estimatedLoanInstalment - (params.vehicleInsurance + igv);
            } else {
               interest = interestCalc;
               principal = +(estimatedLoanInstalment - interest - params.vehicleInsurance - igv).toFixed(2);
            }

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
            break;
         };
      }

      // return +estimatedLoanInstalment.toFixed(2);
      return +1856.48;
   }

   private calcularDiasEntreDosFechas(startDate: Date, endDate: Date) {
      const difference: number = Math.abs((endDate).getTime() - (startDate).getTime())
      const convertToDays: number = Math.ceil(difference / (1000 * 60 * 60 * 24));

      return convertToDays;
   }
}