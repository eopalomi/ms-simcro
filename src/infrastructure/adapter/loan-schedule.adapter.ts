import { CalculateLoanPaymentService } from "../../application/services/calculate-loan-payment.service";
import { LoanSchedule } from "../../domain/models/loan-schedule.model";
import { LoanScheduleRepository } from "../../domain/repositories/loan-schedule.repository";

export class LoanScheduleAdapter implements LoanScheduleRepository {
    constructor() { }

    simulateSchedule(
        loanSchedule: LoanSchedule
    ) {
        return loanSchedule;
    }

}