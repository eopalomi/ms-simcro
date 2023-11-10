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
            typeLifeInsurance: string,
            typeIGV: string,
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
            typeLifeInsurance: body.typeLifeInsurance,
            typeIGV: body.typeIGV,
        })

        res.json({
            status: 'ok',
            message: response
        })
    }
};