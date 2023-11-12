"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanSchedule = void 0;
class LoanSchedule {
    toString() {
        // return this._installments?.map(installment => installment.installment) ?? null
        return 'hola';
    }
    set installments(val) {
        this._installments = val;
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
    constructor(constructor) {
        this._effectiveAnualRate = null;
        this._effectiveCostAnualRate = null;
        this._installments = null;
        this._idLoanSchedule = constructor.idLoanSchedule;
    }
}
exports.LoanSchedule = LoanSchedule;
