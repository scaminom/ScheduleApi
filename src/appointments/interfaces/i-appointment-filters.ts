import { APPOINTMENT_STATUS } from '@prisma/client'

export interface IAppointementFilters {
  startDate?: Date
  endDate?: Date
  date?: Date
  status?: APPOINTMENT_STATUS
  userCI?: string
  clientName?: string
  vehicleDescription?: string
}
