import { APPOINTMENT_STATUS, PrismaClient, Role } from '@prisma/client'
import {
  defineAppointmentFactory,
  initialize,
} from '../../../src/__generated__/fabbrica'
import { generateValidCI } from 'test/users/factories/user.factory'
import fakerEs from 'src/faker/faker.config'

const prisma = new PrismaClient()

initialize({ prisma })
export const fakerAppointmentFactorySchema = {
  clientName: fakerEs.person.firstName(),
  vehicleDescription: fakerEs.vehicle.vehicle(),
  description: fakerEs.lorem.sentence(),
  date: fakerEs.date.future(),
  status: APPOINTMENT_STATUS.PENDING,
  user: {
    create: {
      ci: generateValidCI(),
      color: fakerEs.vehicle.color(),
      firstName: fakerEs.person.firstName(),
      lastName: fakerEs.person.lastName(),
      role: fakerEs.helpers.arrayElement(Object.values(Role)),
      password: fakerEs.internet.password(),
      deletedAt: null,
    },
  },
}

export const AppointmentFactory = defineAppointmentFactory({
  defaultData: fakerAppointmentFactorySchema,
})
