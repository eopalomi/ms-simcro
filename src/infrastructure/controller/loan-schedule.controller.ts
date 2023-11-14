import { SimulateloanScheduleUseCase } from "../../application/loan-schedule/simulate-loan-shedule.use-case";
import { Request, Response } from 'express'

export class LoanScheduleController {
    constructor(private simulateloanScheduleUseCase: SimulateloanScheduleUseCase) { }

    public simulateLoanSchedule = (req: Request, res: Response) => {
        const body = req.body as {
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
            igv: boolean,
        };

        const response = this.simulateloanScheduleUseCase.execute({
            loanPrincipal: body.loanPrincipal,
            startDate: body.startDate,
            firstDueDate: body.firstDueDate,
            loanTerm: body.loanTerm,
            effectiveAnualRate: body.effectiveAnualRate,
            paymentFrecuency: body.paymentFrecuency,
            businessDays: body.businessDays,
            calculationType: body.calculationType,
            scheduleType: body.scheduleType,
            typeVehicleInsurance: body.typeVehicleInsurance,
            vehicleInsurance: body.vehicleInsurance,
            typeLifeInsurance: body.typeLifeInsurance,
            igv: body.igv,
        })

        res.json({
            status: 'ok',
            effectiveAnualRate: response.effectiveAnualRate,
            effectiveCostAnualRate: response.effectiveCostAnualRate,
            loanSchedule: response.loanInstallments
        })
    }
};