"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanInstallment = void 0;
class LoanInstallment {
    constructor(constructor) {
        this._numberPayment = constructor.numberPayment;
        this._paymentDate = constructor.paymentDate;
        this._principal = constructor.principal;
        this._interest = constructor.interest;
        this._allInterest = constructor.allInterest;
        this._vehicleInsurance = constructor.vehicleInsurance;
        this._lifeInsurance = constructor.lifeInsurance;
        this._igv = constructor.igv;
        this._preventionInsurance = constructor.preventionInsurance;
        this._finalPrincipal = constructor.finalPrincipal;
    }
    get numberPayment() {
        return this._numberPayment;
    }
    set numberPayment(val) {
        this._numberPayment = val;
    }
    get paymentDate() {
        return this._paymentDate;
    }
    set paymentDate(val) {
        this._paymentDate = val;
    }
    get principal() {
        return this._principal;
    }
    set principal(val) {
        this._principal = val;
    }
    get interest() {
        return this._interest;
    }
    set interest(val) {
        this._interest = val;
    }
    get vehicleInsurance() {
        return this._vehicleInsurance;
    }
    set vehicleInsurance(val) {
        this._vehicleInsurance = val;
    }
    get lifeInsurance() {
        return this._lifeInsurance;
    }
    set lifeInsurance(val) {
        this._lifeInsurance = val;
    }
    get igvInsurance() {
        return this._igv;
    }
    set igvInsurance(val) {
        this._igv = val;
    }
    get preventionInsurance() {
        return this._preventionInsurance;
    }
    set preventionInsurance(val) {
        this._preventionInsurance = val;
    }
    get finalPrincipal() {
        return this._finalPrincipal;
    }
    set finalPrincipal(val) {
        this._finalPrincipal = val;
    }
    get installment() {
        return {
            numberOfPayment: this._numberPayment,
            paymentDate: this._paymentDate,
            principal: this._principal,
            interest: this._interest,
            allInterest: this._allInterest,
            vehicleInsurance: this._vehicleInsurance,
            igv: this._igv,
            finalPricipalBalance: this._finalPrincipal,
            payment: +(this._principal + this._interest + this._vehicleInsurance + this._igv).toFixed(2),
        };
    }
}
exports.LoanInstallment = LoanInstallment;
