import { LoanInstallment } from "./loan-installment.model";

export class LoanSchedule {
   private _idLoanSchedule: string;
   private _effectiveAnualRate: number | null = null;
   private _effectiveCostAnualRate: number | null = null;
   private _installments: LoanInstallment[] | null = null;

   get loanInstallments() {
      return this._installments?.map(installment => installment.installment) ?? null
   }

   set installments(val: LoanInstallment[] | null) {
      this._installments = val
   }

   get idLoanSchedule() {
      return this._idLoanSchedule
   }

   set idLoanSchedule(val: string) {
      this._idLoanSchedule = val
   }

   get effectiveAnualRate() {
      return this._effectiveAnualRate
   }

   set effectiveAnualRate(val: number | null) {
      this._effectiveAnualRate = val
   }

   get effectiveCostAnualRate() {
      return this._effectiveCostAnualRate
   }

   set effectiveCostAnualRate(val: number | null) {
      this._effectiveCostAnualRate = val
   }

   constructor(constructor: {
      idLoanSchedule: string
   }) {
      this._idLoanSchedule = constructor.idLoanSchedule;
   }

}