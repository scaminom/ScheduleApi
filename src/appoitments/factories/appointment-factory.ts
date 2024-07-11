import { PrismaClient, Role } from '@prisma/client'
import {
  defineAppointmentFactory,
  initialize,
} from '../../__generated__/fabbrica'

const prisma = new PrismaClient()

initialize({ prisma })

export const AppointmentFactory = defineAppointmentFactory({
  defaultData: {
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
    status: 'PENDING',
    user: {
      create: {
        ci: '1234567',
        firstName: 'John',
        lastName: 'Doe',
        role: Role.MECHANIC,
        password: 'passW0rd',
        deletedAt: null,
      },
    },
  },
})
