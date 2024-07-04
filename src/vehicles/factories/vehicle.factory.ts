import { PrismaClient } from '@prisma/client'
import { defineVehicleFactory, initialize } from '../../__generated__/fabbrica'

const prisma = new PrismaClient()
initialize({ prisma })
export const VehicleFactory = defineVehicleFactory()
