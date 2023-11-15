import { LoanInstallment } from "../../domain/models/loan-installment.model";

export class CalculateSchedule {
    [x: string]: any;
    constructor() { }

    private calcularDiasEntreDosFechas(startDate: Date, endDate: Date) {
        const difference: number = Math.abs((endDate).getTime() - (startDate).getTime())
        const convertToDays: number = Math.ceil(difference / (1000 * 60 * 60 * 24));

        return convertToDays;
    }

    scheduleWithCapitalization(params: {
        loanPrincipal: number,
        startDate: Date,
        firstDueDate: Date,
        loanInstallment: number,
        loanTerm: number,
        effectiveAnualRate: number,
        paymentFrecuency: string,
        businessDays: boolean,
        calculationType: string,
        scheduleType: string,
        typeVehicleInsurance: string,
        typeLifeInsurance: string,
        igv: boolean
    }): LoanInstallment[] {
        const installments = new Array(params.loanTerm).fill(params.loanInstallment);
        let numberOfPayment: number = 0;
        let initialPrincipal: number = +params.loanPrincipal;
        let finalPrincipal: number = 0.00;
        let dueDate: Date = new Date(params.firstDueDate);
        let startDate: Date = new Date(params.startDate);
        let paymentSchedule: LoanInstallment[] = [];

        installments.forEach((rs, idx, arr) => {
            numberOfPayment++;
            let daysBetweenDates = this.calcularDiasEntreDosFechas(startDate, dueDate);

            let interest: number = +(((1 + params.effectiveAnualRate) ** (daysBetweenDates / 360) - 1) * initialPrincipal).toFixed(2);
            let principal = +(params.loanInstallment - interest).toFixed(2);
            // console.log('loan', params.loanInstallment, 'initialPrincipal', initialPrincipal, 'finalPrincipal', finalPrincipal, 'Principal', principal, 'interest', interest)

            finalPrincipal = +(initialPrincipal - principal).toFixed(2);
            initialPrincipal = +finalPrincipal.toFixed(2);

            if (idx + 1 === installments.length) {
                principal = +(finalPrincipal + principal).toFixed(2);
                finalPrincipal = 0.00;
            }

            startDate = new Date(dueDate.getTime());
            dueDate.setMonth(dueDate.getMonth() + 1);

            const loanInstallment = new LoanInstallment({
                numberPayment: numberOfPayment,
                paymentDate: dueDate.toISOString().substring(0, 10),
                principal: principal,
                interest: interest,
                allInterest: 0.00,
                vehicleInsurance: 0.00,
                lifeInsurance: 0.00,
                igv: 0.00,
                preventionInsurance: 0.00,
                finalPrincipal: finalPrincipal
            })

            paymentSchedule.push(loanInstallment)
        })

        return paymentSchedule;
    };

    scheduleWithOutCapitalization(params: {
        loanPrincipal: number,
        startDate: Date,
        firstDueDate: Date,
        loanInstallment: number,
        loanTerm: number,
        effectiveAnualRate: number,
        paymentFrecuency: string,
        businessDays: boolean,
        calculationType: string,
        scheduleType: string,
        typeVehicleInsurance: string,
        vehicleInsurance: number,
        typeLifeInsurance: string,
        igv: boolean
    }): LoanInstallment[] {
        console.log("params", params)
        const installments = new Array(params.loanTerm).fill(params.loanInstallment);
        let numberOfPayment: number = 0;
        let initialPrincipal: number = +params.loanPrincipal;
        let finalPrincipal: number = 0.00;
        let dueDate: Date = new Date(params.firstDueDate);
        let startDate: Date = new Date(params.startDate);
        let paymentSchedule: LoanInstallment[] = [];
        let initialInterestBag: number = 0.00;
        let consoleTable:any = [];

        installments.forEach((rs, idx, arr) => {
            numberOfPayment++;
            let daysBetweenDates = this.calcularDiasEntreDosFechas(startDate, dueDate);
            let calculatedInterest: number = +(((1 + params.effectiveAnualRate) ** (daysBetweenDates / 360) - 1) * initialPrincipal).toFixed(2);
            let installmentsWithNoAdditional = +(params.loanInstallment - params.vehicleInsurance).toFixed(2)

            let interestOfTheBag = initialInterestBag > 0 ? +(((1 + params.effectiveAnualRate) ** (daysBetweenDates / 360) - 1) * initialInterestBag).toFixed(2) : 0.00;
            let allInterest = +(calculatedInterest + initialInterestBag + interestOfTheBag).toFixed(2);

            let interest: number = allInterest > (installmentsWithNoAdditional/1.18) ? +(installmentsWithNoAdditional/1.18).toFixed(2) : allInterest;
            let igv: number = params.igv === true ? +(interest * 0.18).toFixed(2) : 0.00;

            let interestBag:number = +(allInterest - interest).toFixed(2);
            
            let principal: number = allInterest > installmentsWithNoAdditional ? 0.00 : +(installmentsWithNoAdditional - interest - igv).toFixed(2) ;

            finalPrincipal = +(initialPrincipal - principal).toFixed(2);
            // Ajuste de la ultima cuota
            if (idx + 1 === installments.length) {
                principal = +(finalPrincipal + principal).toFixed(2);
                finalPrincipal = 0.00;
            }

            consoleTable.push({
                "cta": numberOfPayment, 
                'loan': params.loanInstallment,
                "dueDate": dueDate.toISOString().substring(0,10),
                'daysBetweenDates': daysBetweenDates,
                'initialPrincipal': initialPrincipal,
                'finalPrincipal': finalPrincipal,
                'Principal': principal,
                'interest': interest,
                'calculatedInterest': calculatedInterest,
                'allInterest': allInterest,
                "vehicleInsurance": params.vehicleInsurance,
                "initialInterestBag": initialInterestBag,
                "interestOfTheBag": interestOfTheBag,
                'interestBag': interestBag,
                "igv": igv,
                "cuota": +(interest + principal + igv + params.vehicleInsurance).toFixed(2)
            })

            const loanInstallment = new LoanInstallment({
                numberPayment: numberOfPayment,
                paymentDate: dueDate.toISOString().substring(0, 10),
                principal: principal,
                interest: interest,
                allInterest: allInterest,
                vehicleInsurance: params.vehicleInsurance,
                lifeInsurance: 0.00,
                igv: igv,
                preventionInsurance: 0.00,
                finalPrincipal: finalPrincipal
            })

            initialInterestBag = interestBag;
            initialPrincipal = finalPrincipal;
            startDate = new Date(dueDate.getTime());
            dueDate.setMonth(dueDate.getMonth() + 1);

            paymentSchedule.push(loanInstallment)
        })
        console.table(consoleTable)
        return paymentSchedule;
    };
}