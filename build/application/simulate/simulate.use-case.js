"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulateUseCase = void 0;
class SimulateUseCase {
    constructor(loanScheduleRepository) {
        this.loanScheduleRepository = loanScheduleRepository;
        this.execute = (params) => {
            return this.loanScheduleRepository.simulate(params);
        };
    }
}
exports.SimulateUseCase = SimulateUseCase;
;
