"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulateUseCase = void 0;
const loan_schedule_model_1 = require("../../domain/models/loan-schedule.model");
const calculate_loan_payment_service_1 = require("../services/calculate-loan-payment.service");
class SimulateUseCase {
    constructor(loanScheduleRepository) {
        this.loanScheduleRepository = loanScheduleRepository;
        this.execute = (params) => {
            const loanSchedule = new loan_schedule_model_1.LoanSchedule({ idLoanSchedule: 'abc123' });
            const calculatedPayment = this.loanService.monthlyFee(params);
            // return this.loanScheduleRepository.simulate(params);
            return loanSchedule;
        };
        this.loanService = new calculate_loan_payment_service_1.CalculateLoanPaymentService();
    }
}
exports.SimulateUseCase = SimulateUseCase;
;
