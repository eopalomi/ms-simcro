export type LoanScheduleRepository = {
    simulate(args: {
        loanPrincipal: number,
        startDate: Date,
        firstDueDate: Date,
        paymentFrecuency: string,
        businessDays: boolean,
        calculationType: string,
        scheduleType: string,
        typeIGV: string,
        typeVehicleInsurance: boolean,
        typeLifeInsurance: boolean,

    }): string;
}