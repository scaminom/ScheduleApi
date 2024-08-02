import { APPOINTMENT_STATUS, PrismaClient } from '@prisma/client'
import {
  defineInspectionFactory,
  initialize,
} from '../../../src/__generated__/fabbrica'
import { fakerAppointmentFactorySchema } from 'test/appointments/factories/appointment-factory'

const prisma = new PrismaClient()

initialize({ prisma })

export const InspectionFactory = defineInspectionFactory({
  defaultData: {
    startDate: new Date(),
    status: APPOINTMENT_STATUS.PENDING,
    appointment: {
      create: fakerAppointmentFactorySchema,
    },
  },
})
