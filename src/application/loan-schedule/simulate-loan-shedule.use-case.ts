import { LoanSchedule } from "../../domain/models/loan-schedule.model";
import { LoanScheduleRepository } from "../../domain/repositories/loan-schedule.repository";
import { CalculateLoanPaymentService } from "../services/calculate-loan-payment.service";
import { CalculateSchedule } from "../services/calculate-schedule.service";

export class SimulateloanScheduleUseCase {
    private calculateLoanPaymentService: CalculateLoanPaymentService;
    private calculateSchedule: CalculateSchedule;

    constructor(private loanScheduleRepository: LoanScheduleRepository) {
        this.calculateLoanPaymentService = new CalculateLoanPaymentService();
        this.calculateSchedule = new CalculateSchedule();
    }

    execute = (params: {
        loanPrincipal: number,
        startDate: Date,
        firstDueDate: Date,
        loanTerm: number,
        effectiveAnualRate: number,
        paymentFrecuency: string,
        businessDays: boolean,
        calculationType: string,
        scheduleType: string,
        typeVehicleInsurance: string,
        vehicleInsurance: number,
        typeLifeInsurance: string,
        igv: boolean,
    }): LoanSchedule => {
        const loanSchedule = new LoanSchedule({ idLoanSchedule: 'abc123' })

        const calculatedPayment = this.calculateLoanPaymentService.monthlyFee(params);
        console.log('calculatedPayment', calculatedPayment, "params.firstDueDate", new Date(params.firstDueDate))

        if (params.scheduleType === 'NOR') {
            loanSchedule.installments = this.calculateSchedule.scheduleWithCapitalization({
                loanPrincipal: params.loanPrincipal,
                startDate: params.startDate,
                firstDueDate: new Date(params.firstDueDate),
                loanInstallment: calculatedPayment,
                loanTerm: params.loanTerm,
                effectiveAnualRate: params.effectiveAnualRate,
                paymentFrecuency: params.paymentFrecuency,
                businessDays: params.businessDays,
                calculationType: params.calculationType,
                scheduleType: params.scheduleType,
                typeVehicleInsurance: params.typeVehicleInsurance,
                typeLifeInsurance: params.typeLifeInsurance,
                igv: params.igv
            });
        }

        if (params.scheduleType === 'REP') {
            loanSchedule.installments = this.calculateSchedule.scheduleWithOutCapitalization({
                loanPrincipal: params.loanPrincipal,
                startDate: params.startDate,
                firstDueDate: new Date(params.firstDueDate),
                loanInstallment: calculatedPayment,
                loanTerm: params.loanTerm,
                effectiveAnualRate: params.effectiveAnualRate,
                paymentFrecuency: params.paymentFrecuency,
                businessDays: params.businessDays,
                calculationType: params.calculationType,
                scheduleType: params.scheduleType,
                typeVehicleInsurance: params.typeVehicleInsurance,
                vehicleInsurance: params.vehicleInsurance,
                typeLifeInsurance: params.typeLifeInsurance,
                igv: params.igv
            });
        }
        // console.log("loanSchedule ", loanSchedule)
        return loanSchedule;
    };

};