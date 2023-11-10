import { LoanInstallment } from "./loan-installment.model";

export class LoanSchedule {
   private _idLoanSchedule: string;
   private _effectiveAnualRate: number | null = null;
   private _effectiveCostAnualRate: number | null = null;
   private _installments: LoanInstallment[] | null = null;

   constructor(constructor: {
      idLoanSchedule: string
   }) {
      this._idLoanSchedule = constructor.idLoanSchedule;
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

   get installments() {
      return this._installments
   }

   set installments(val: LoanInstallment[] | null) {
      this._installments = val
   }
}