export class LoanInstallment {
   private _numberPayment: number;
   private _paymentDate: string;
   private _principal: number;
   private _interest: number;
   private _vehicleInsurance: number;
   private _lifeInsurance: number;
   private _igvInsurance: number;
   private _preventionInsurance: number;
   private _finalPrincipal: number;

   constructor(constructor: {
      numberPayment: number,
      paymentDate: string,
      principal: number,
      interest: number,
      vehicleInsurance: number,
      lifeInsurance: number,
      igvInsurance: number,
      preventionInsurance: number,
      finalPrincipal: number,
   }) {
      this._numberPayment = constructor.numberPayment;
      this._paymentDate = constructor.paymentDate;
      this._principal = constructor.principal;
      this._interest = constructor.interest;
      this._vehicleInsurance = constructor.vehicleInsurance;
      this._lifeInsurance = constructor.lifeInsurance;
      this._igvInsurance = constructor.igvInsurance;
      this._preventionInsurance = constructor.preventionInsurance;
      this._finalPrincipal = constructor.finalPrincipal;
   }

   get numberPayment() {
      return this._numberPayment
   }

   set numberPayment(val: number) {
      this._numberPayment = val
   }

   get paymentDate() {
      return this._paymentDate
   }

   set paymentDate(val: string) {
      this._paymentDate = val
   }

   get principal() {
      return this._principal
   }

   set principal(val: number) {
      this._principal = val
   }

   get interest() {
      return this._interest
   }

   set interest(val: number) {
      this._interest = val
   }

   get vehicleInsurance() {
      return this._vehicleInsurance
   }

   set vehicleInsurance(val: number) {
      this._vehicleInsurance = val
   }

   get lifeInsurance() {
      return this._lifeInsurance
   }

   set lifeInsurance(val: number) {
      this._lifeInsurance = val
   }

   get igvInsurance() {
      return this._igvInsurance
   }

   set igvInsurance(val: number) {
      this._igvInsurance = val
   }

   get preventionInsurance() {
      return this._preventionInsurance
   }

   set preventionInsurance(val: number) {
      this._preventionInsurance = val
   }

   get finalPrincipal() {
      return this._finalPrincipal
   }

   set finalPrincipal(val: number) {
      this._finalPrincipal = val
   }

   get installment() {
      return {
         numberOfPayment: this._numberPayment,
         paymentDate: this._paymentDate,
         principal: this._principal,
         interest: this._interest,
         vehicleInsurance: this._vehicleInsurance,
         finalPricipalBalance: this._finalPrincipal,
         payment: +(this._principal + this._interest + this._vehicleInsurance).toFixed(2)
      }
   }
}