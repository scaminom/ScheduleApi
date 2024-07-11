import { APPOINTMENT_STATUS, PrismaClient } from '@prisma/client'
import {
  defineInspectionFactory,
  initialize,
} from '../../__generated__/fabbrica'

const prisma = new PrismaClient()

initialize({ prisma })

export const InspectionFactory = defineInspectionFactory({
  defaultData: {
    endDate: new Date(),
    startDate: new Date(),
    status: APPOINTMENT_STATUS.PENDING,
    appointment: {
      create: {
        clientName: 'John Doe',
        vehicle: {
          create: {
            plate: 'ABC123',
            type: 'Car',
            brand: 'Toyota',
            model: 'Corolla',
            color: 'White',
          },
        },
        description: 'Description',
        date: new Date(),
        status: APPOINTMENT_STATUS.PENDING,
        user: {
          create: {
            ci: '1234567',
            firstName: 'John',
            lastName: 'Doe',
            role: 'MECHANIC',
            password: 'passW0rd',
            deletedAt: null,
          },
        },
      },
    },
  },
})
