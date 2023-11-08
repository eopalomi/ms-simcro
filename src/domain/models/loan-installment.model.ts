export class LoanInstallment {
   private _numberPayment: number;
   private _paymentDate: string;
   private _principal: number;
   private _interest: number;
   private _vehicleInsurance: number;
   private _lifeInsurance: number;
   private _igvInsurance: number;
   private _preventionInsurance: number;

   constructor(constructor: {
      numberPayment: number,
      paymentDate: string,
      principal: number,
      interest: number,
      vehicleInsurance: number,
      lifeInsurance: number,
      igvInsurance: number,
      preventionInsurance: number
   }) {
      this._numberPayment = constructor.numberPayment;
      this._paymentDate = constructor.paymentDate;
      this._principal = constructor.principal;
      this._interest = constructor.interest;
      this._vehicleInsurance = constructor.vehicleInsurance;
      this._lifeInsurance = constructor.lifeInsurance;
      this._igvInsurance = constructor.igvInsurance;
      this._preventionInsurance = constructor.preventionInsurance;
   }

   get numberPayment(): number {
      return this._numberPayment;
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
}