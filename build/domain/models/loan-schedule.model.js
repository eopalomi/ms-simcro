"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanInstallment = void 0;
class LoanInstallment {
    constructor(constructor) {
        this._idLoanSchedule = constructor.idLoanSchedule;
        this._effectiveAnualRate = constructor.effectiveAnualRate;
        this._effectiveCostAnualRate = constructor.effectiveCostAnualRate;
    }
    get idLoanSchedule() {
        return this._idLoanSchedule;
    }
    set idLoanSchedule(val) {
        this._idLoanSchedule = val;
    }
    get effectiveAnualRate() {
        return this._effectiveAnualRate;
    }
    set effectiveAnualRate(val) {
        this._effectiveAnualRate = val;
    }
    get effectiveCostAnualRate() {
        return this._effectiveCostAnualRate;
    }
    set effectiveCostAnualRate(val) {
        this._effectiveCostAnualRate = val;
    }
    get installments() {
        return this._installments;
    }
    set installments(val) {
        this._installments = val;
    }
}
exports.LoanInstallment = LoanInstallment;
