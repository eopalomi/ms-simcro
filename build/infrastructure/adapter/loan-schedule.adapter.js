"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanScheduleAdapter = void 0;
const calculate_loan_payment_service_1 = require("../services/calculate-loan-payment.service");
class LoanScheduleAdapter {
    constructor() { }
    simulate(args) {
        const payment = new calculate_loan_payment_service_1.CalculateLoanPaymentService();
        return payment.monthlyFee(args);
    }
}
exports.LoanScheduleAdapter = LoanScheduleAdapter;
