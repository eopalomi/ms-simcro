import { LoanSchedule } from "../models/loan-schedule.model";

export type LoanScheduleRepository = {
    simulateSchedule(loanSchedule: LoanSchedule): LoanSchedule
}