import { SimulateUseCase } from "../../application/simulate/simulate.use-case";
import { Request, Response } from 'express'

export class LoanScheduleController {
    constructor(private simulate: SimulateUseCase) { }

    public simulateLoanSchedule = (req: Request, res: Response) => {
        const body = req.body as {
            loanPrincipal: number,
            startDate: Date,
            firstDueDate: Date,
            loanInstallment: number,
            loanTerm: number,
            anualEffectiveRate: number,
            paymentFrecuency: string,
            businessDays: boolean,
            calculationType: string,
            scheduleType: string,
            typeVehicleInsurance: string,
            typeLifeInsurance: string,
            typeIGV: string,
        };
        console.log("dasdsa", body);
        const response = this.simulate.execute({
            loanPrincipal: body.loanPrincipal,
            startDate: body.startDate,
            firstDueDate: body.firstDueDate,
            loanInstallment: body.loanInstallment,
            loanTerm: body.loanTerm,
            anualEffectiveRate: body.anualEffectiveRate,
            paymentFrecuency: body.paymentFrecuency,
            businessDays: body.businessDays,
            calculationType: body.calculationType,
            scheduleType: body.scheduleType,
            typeVehicleInsurance: body.typeVehicleInsurance,
            typeLifeInsurance: body.typeLifeInsurance,
            typeIGV: body.typeIGV,
        })
        console.log("response", response);
        res.json({
            status: 'ok',
            message: response
        })
    }
};