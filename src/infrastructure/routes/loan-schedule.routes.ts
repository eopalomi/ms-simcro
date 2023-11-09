import { Router } from 'express'
import { LoanScheduleAdapter } from '../adapter/loan-schedule.adapter';
import { SimulateUseCase } from '../../application/simulate/simulate.use-case';
import { LoanScheduleController } from '../controller/loan-schedule.controller';


const router = Router();

const loanScheduleRepository = new LoanScheduleAdapter();
const simulareUseCase = new SimulateUseCase(loanScheduleRepository);
const loanScheduleController = new LoanScheduleController(simulareUseCase);

router.post('/simcro', loanScheduleController.simulateLoanSchedule)

export { router };

