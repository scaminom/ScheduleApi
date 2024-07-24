import { APPOINTMENT_STATUS } from '@prisma/client'

export interface IAppointmentFilters {
  startDate?: Date
  endDate?: Date
  date?: Date
  status?: APPOINTMENT_STATUS
  userCI?: string
  clientName?: string
  vehicleDescription?: string
}
