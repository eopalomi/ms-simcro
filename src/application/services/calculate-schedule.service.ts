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
        typeIGV: string
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
            console.log('loan', params.loanInstallment, 'initialPrincipal', initialPrincipal, 'finalPrincipal', finalPrincipal, 'Principal', principal, 'interest', interest)

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
                vehicleInsurance: 0.00,
                lifeInsurance: 0.00,
                igvInsurance: 0.00,
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
        typeIGV: string
    }): LoanInstallment[] {
        const installments = new Array(params.loanTerm).fill(params.loanInstallment);
        let numberOfPayment: number = 0;
        let initialPrincipal: number = +params.loanPrincipal;
        let finalPrincipal: number = 0.00;
        let dueDate: Date = new Date(params.firstDueDate);
        let startDate: Date = new Date(params.startDate);
        let paymentSchedule: LoanInstallment[] = [];
        let interestBag: number = 0.00;
        let interestOfTheBag: number = 0.00;

        installments.forEach((rs, idx, arr) => {
            numberOfPayment++;
            let daysBetweenDates = this.calcularDiasEntreDosFechas(startDate, dueDate);

            let interest: number = +(((1 + params.effectiveAnualRate) ** (daysBetweenDates / 360) - 1) * initialPrincipal).toFixed(2);
            let principal = +(params.loanInstallment - interest - params.vehicleInsurance).toFixed(2);

            interestOfTheBag = interestBag > 0 ? +(((1 + params.effectiveAnualRate) ** (daysBetweenDates / 360) - 1) * interestBag).toFixed(2) : 0.00;
            let allInterest = +(interest + interestBag + interestOfTheBag).toFixed(2);

            if (allInterest >= params.loanInstallment) {
                interest = +(params.loanInstallment - params.vehicleInsurance).toFixed(2);
                interestBag = allInterest - interest;
                principal = 0.00;
            };

            if (allInterest < params.loanInstallment && interestBag > 0) {
                interest = +(interest + interestBag + interestOfTheBag).toFixed(2);
                principal = +(params.loanInstallment - interest - params.vehicleInsurance).toFixed(2);
                interestBag = 0.00;
            }

            // console.log('loan', params.loanInstallment, 'initialPrincipal', initialPrincipal, 'finalPrincipal', finalPrincipal, 'Principal', principal, 'interest', interest, 'allInterest', allInterest, 'interestBag', interestBag)

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
                vehicleInsurance: params.vehicleInsurance,
                lifeInsurance: 0.00,
                igvInsurance: 0.00,
                preventionInsurance: 0.00,
                finalPrincipal: finalPrincipal
            })

            paymentSchedule.push(loanInstallment)
        })

        return paymentSchedule;
    };
}