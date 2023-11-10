"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanSchedule = void 0;
class LoanSchedule {
    constructor(constructor) {
        this._effectiveAnualRate = null;
        this._effectiveCostAnualRate = null;
        this._installments = null;
        this._idLoanSchedule = constructor.idLoanSchedule;
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
exports.LoanSchedule = LoanSchedule;
