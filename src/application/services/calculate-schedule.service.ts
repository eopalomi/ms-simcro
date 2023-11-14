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
        typeIGV: boolean
    }): LoanInstallment[] {
        console.log("firstDueDate", params.firstDueDate)
        const installments = new Array(params.loanTerm).fill(params.loanInstallment);
        let numberOfPayment: number = 0;
        let initialPrincipal: number = +params.loanPrincipal;
        let finalPrincipal: number = 0.00;
        let dueDate: Date = new Date(params.firstDueDate);
        let startDate: Date = new Date(params.startDate);
        let paymentSchedule: LoanInstallment[] = [];
        let interestBag: number = 0.00;
        let initialInterestBag: number = 0.00;
        // let interestOfTheBag: number = 0.00;
        console.log("dueDate", dueDate)
        console.log("params.typeIGV", params.typeIGV)
        installments.forEach((rs, idx, arr) => {
            numberOfPayment++;
            let daysBetweenDates = this.calcularDiasEntreDosFechas(startDate, dueDate);

            let interestCalc: number = +(((1 + params.effectiveAnualRate) ** (daysBetweenDates / 360) - 1) * initialPrincipal).toFixed(2);
            let igv: number = params.typeIGV === true ? +(interestCalc * 0.18).toFixed(2) : 0.00;
            let principal: number = -1;
            let interest: number = -1;

            let paymentKxI = +(params.loanInstallment - params.vehicleInsurance - igv).toFixed(2);
            let interestOfTheBag = initialInterestBag > 0 ? +(((1 + params.effectiveAnualRate) ** (daysBetweenDates / 360) - 1) * initialInterestBag).toFixed(2) : 0.00;
            let allInterest = +(interestCalc + initialInterestBag + interestOfTheBag).toFixed(2);

            // console.log("interestCalc > paymentKxI && params.typeIGV", interestCalc, paymentKxI, params.typeIGV)
            if (allInterest > paymentKxI && params.typeIGV === true) {
                interest = +((params.loanInstallment - params.vehicleInsurance) / 1.18).toFixed(2);
                igv = +(interest * 0.18).toFixed(2);
                principal = 0.00;
            } else if (allInterest > paymentKxI && params.typeIGV === false) {
                interest = allInterest;
                igv = 0.00;
                principal = 0.00;
            } else if (allInterest < paymentKxI && params.typeIGV === true) {
                interest = allInterest;
                principal = +(paymentKxI - interest - igv).toFixed(2);
            } else if (allInterest < paymentKxI && params.typeIGV === false) {
                interest = allInterest;
                principal = +(paymentKxI - interest).toFixed(2);
            };

            interestBag = +(allInterest - interest).toFixed(2);



            // if (allInterest >= params.loanInstallment) {
            //     // console.log(">>>>>>>> enter here 1");
            //     interest = +(params.loanInstallment - params.vehicleInsurance - igv).toFixed(2);
            //     interestBag = +(allInterest - interest).toFixed(2);
            //     principal = 0.00;
            // } else {
            //     // console.log(">>>>>>>> enter here 2", allInterest, ' - ', interest);
            //     interestBag = +(allInterest - interest).toFixed(2);
            // }

            console.log(
                "cta", numberOfPayment,
                'loan', params.loanInstallment,
                // "dueDate", dueDate,
                // 'daysBetweenDates', daysBetweenDates,
                // 'initialPrincipal', initialPrincipal,
                // 'finalPrincipal', finalPrincipal,
                'Principal', principal,
                'interest', interest,
                'interestCalc', interestCalc,
                'allInterest', allInterest,
                // 'intNCF', +(allInterest - interest).toFixed(2),
                "vehicleInsurance", params.vehicleInsurance,
                "initialInterestBag", initialInterestBag,
                "interestOfTheBag", interestOfTheBag,
                'interestBag', interestBag,
                "igv", igv,
                "cuota", paymentKxI
                // +(params.loanInstallment - params.vehicleInsurance - igv).toFixed(2)
            )
            initialInterestBag = interestBag;
            finalPrincipal = +(initialPrincipal - principal).toFixed(2);
            initialPrincipal = +finalPrincipal.toFixed(2);

            // Ajuste de la ultima cuota
            if (idx + 1 === installments.length) {
                principal = +(finalPrincipal + principal).toFixed(2);
                finalPrincipal = 0.00;
            }

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

            startDate = new Date(dueDate.getTime());
            dueDate.setMonth(dueDate.getMonth() + 1);

            paymentSchedule.push(loanInstallment)
        })

        return paymentSchedule;
    };
}