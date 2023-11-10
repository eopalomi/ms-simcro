import { Router } from 'express'
import { LoanScheduleAdapter } from '../adapter/loan-schedule.adapter';
import { SimulateloanScheduleUseCase } from '../../application/loan-schedule/simulate-loan-shedule.use-case';
import { LoanScheduleController } from '../controller/loan-schedule.controller';

const router = Router();

const loanScheduleRepository = new LoanScheduleAdapter();
const simulareUseCase = new SimulateloanScheduleUseCase(loanScheduleRepository);
const loanScheduleController = new LoanScheduleController(simulareUseCase);

router.post('/simcro', loanScheduleController.simulateLoanSchedule)

export { router };