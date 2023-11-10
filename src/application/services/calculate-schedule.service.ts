import { LoanInstallment } from "../../domain/models/loan-installment.model";

export class CalculateSchedule {
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

            let interest: number = ((1 + +params.effectiveAnualRate) ** (+daysBetweenDates / 360) - 1) * +initialPrincipal;
            let principal = params.loanInstallment - interest;
            console.log('loan', params.loanInstallment, 'interest', interest)

            finalPrincipal = initialPrincipal - principal;
            initialPrincipal = finalPrincipal;

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
}