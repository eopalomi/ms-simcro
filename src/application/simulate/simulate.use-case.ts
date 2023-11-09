import { LoanScheduleRepository } from "../../domain/repositories/loan-schedule.repository";

export class SimulateUseCase {
    constructor(private loanScheduleRepository: LoanScheduleRepository) { }

    execute = (params: {
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
    }) => {
        return this.loanScheduleRepository.simulate(params);
    };

};