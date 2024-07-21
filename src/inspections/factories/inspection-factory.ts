import { APPOINTMENT_STATUS, PrismaClient } from '@prisma/client'
import {
  defineInspectionFactory,
  initialize,
} from '../../__generated__/fabbrica'
import { fakerAppointmentFactorySchema } from 'src/appointments/factories/appointment-factory'

const prisma = new PrismaClient()

initialize({ prisma })

export const InspectionFactory = defineInspectionFactory({
  defaultData: {
    endDate: new Date(),
    startDate: new Date(),
    status: APPOINTMENT_STATUS.PENDING,
    appointment: {
      create: fakerAppointmentFactorySchema,
    },
  },
})
