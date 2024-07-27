import { APPOINTMENT_STATUS } from '@prisma/client'

export interface IInspectionFilters {
  status?: APPOINTMENT_STATUS
  startDate?: Date
  endDate?: Date
}
