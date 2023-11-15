export class CalculateLoanPaymentService {

   public monthlyFee(params: {
      loanPrincipal: number,
      startDate: Date,
      firstDueDate: Date,
      loanTerm: number,
      effectiveAnualRate: number,
      paymentFrecuency: string,
      businessDays: boolean,
      calculationType: string,
      scheduleType: string,
      typeVehicleInsurance: string,
      vehicleInsurance: number,
      typeLifeInsurance: string,
      igv: boolean
   }): number {
      console.log("monthlyFee params: ", params)
      let maximunFee: number = 200000.00;
      let minimunFee: number = 0.00;
      let estimatedLoanInstalment: number = (maximunFee + minimunFee) / 2
      let count = 0;

      while (true) {
         count++;

         const installments = new Array(params.loanTerm).fill(0.00);
         let numberOfPayment: number = 0;
         let initialPrincipal: number = +params.loanPrincipal;
         let finalPrincipal: number = 0.00;
         let dueDate: Date = new Date(params.firstDueDate);
         let startDate: Date = new Date(params.startDate);
         let initialInterestBag: number = 0.00;

         installments.forEach((rs, idx, arr) => {
            numberOfPayment++;
            let daysBetweenDates = this.calcularDiasEntreDosFechas(startDate, dueDate);

            let calculatedInterest: number = +(((1 + params.effectiveAnualRate) ** (daysBetweenDates / 360) - 1) * initialPrincipal).toFixed(2);
            let installmentsWithNoAdditional = +(estimatedLoanInstalment - params.vehicleInsurance ?? 0.00).toFixed(2);

            let interestOfTheBag = initialInterestBag > 0 ? +(((1 + params.effectiveAnualRate) ** (daysBetweenDates / 360) - 1) * initialInterestBag).toFixed(2) : 0.00;
            let allInterest = +(calculatedInterest + initialInterestBag + interestOfTheBag).toFixed(2);

            let interest: number = allInterest > (installmentsWithNoAdditional/1.18) ? +(installmentsWithNoAdditional/1.18).toFixed(2) : allInterest;
            let igv: number = params.igv === true ? +(interest * 0.18).toFixed(2) : 0.00;
   
            let interestBag:number = +(allInterest - interest).toFixed(2);
            
            let principal: number = allInterest > installmentsWithNoAdditional ? 0.00 : +(installmentsWithNoAdditional - interest - igv).toFixed(2) ;

            finalPrincipal = +(initialPrincipal - principal).toFixed(2);

            initialInterestBag = interestBag;
            initialPrincipal = finalPrincipal;
            startDate = new Date(dueDate.getTime());
            dueDate.setMonth(dueDate.getMonth() + 1);
         })

         if (finalPrincipal > 0.00) {
            minimunFee = estimatedLoanInstalment;
         } else {
            maximunFee = estimatedLoanInstalment;
         };

         estimatedLoanInstalment = (maximunFee + minimunFee) / 2;

         if (Math.abs(finalPrincipal) < 0.01 || count === 250) {
            console.log("finalPrincipal", finalPrincipal)
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