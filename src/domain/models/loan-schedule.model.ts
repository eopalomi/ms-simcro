export class LoanInstallment {
   private _idLoanSchedule: string;
   private _effectiveAnualRate: number;
   private _effectiveCostAnualRate: number;
   private _installments!: LoanInstallment[];

   constructor(constructor: {
      idLoanSchedule: string,
      effectiveAnualRate: number,
      effectiveCostAnualRate: number
   }) {
      this._idLoanSchedule = constructor.idLoanSchedule;
      this._effectiveAnualRate = constructor.effectiveAnualRate;
      this._effectiveCostAnualRate = constructor.effectiveCostAnualRate;
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

   set effectiveAnualRate(val: number) {
      this._effectiveAnualRate = val
   }

   get effectiveCostAnualRate() {
      return this._effectiveCostAnualRate
   }

   set effectiveCostAnualRate(val: number) {
      this._effectiveCostAnualRate = val
   }

   get installments() {
      return this._installments
   }

   set installments(val: LoanInstallment[]) {
      this._installments = val
   }
}