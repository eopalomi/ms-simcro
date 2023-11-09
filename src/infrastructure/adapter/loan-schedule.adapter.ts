import { CalculateLoanPaymentService } from "../services/calculate-loan-payment.service";
import { LoanScheduleRepository } from "../../domain/repositories/loan-schedule.repository";

export class LoanScheduleAdapter implements LoanScheduleRepository {
    constructor() { }
    simulate(args: { loanPrincipal: number; startDate: Date; firstDueDate: Date; loanInstallment: number; loanTerm: number; anualEffectiveRate: number; paymentFrecuency: string; businessDays: boolean; calculationType: string; scheduleType: string; typeVehicleInsurance: string; typeLifeInsurance: string; typeIGV: string; }): number {
        const payment = new CalculateLoanPaymentService()

        return payment.monthlyFee(args);
    }

}