"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanScheduleController = void 0;
class LoanScheduleController {
    constructor(simulate) {
        this.simulate = simulate;
        this.simulateLoanSchedule = (req, res) => {
            const body = req.body;
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
            });
            console.log("response", response);
            res.json({
                status: 'ok',
                message: response
            });
        };
    }
}
exports.LoanScheduleController = LoanScheduleController;
;
