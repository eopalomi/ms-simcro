"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanScheduleController = void 0;
class LoanScheduleController {
    constructor(simulateloanScheduleUseCase) {
        this.simulateloanScheduleUseCase = simulateloanScheduleUseCase;
        this.simulateLoanSchedule = (req, res) => {
            const body = req.body;
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
            });
            res.json({
                status: 'ok',
                effectiveAnualRate: response.effectiveAnualRate,
                effectiveCostAnualRate: response.effectiveCostAnualRate,
                loanSchedule: response.loanInstallments
            });
        };
    }
}
exports.LoanScheduleController = LoanScheduleController;
;
