"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanSchedule = void 0;
class LoanSchedule {
    get loanInstallments() {
        var _a, _b;
        return (_b = (_a = this._installments) === null || _a === void 0 ? void 0 : _a.map(installment => installment.installment)) !== null && _b !== void 0 ? _b : null;
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
