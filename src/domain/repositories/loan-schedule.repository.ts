export type LoanScheduleRepository = {
    simulate(args: {
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
    }): number;
}