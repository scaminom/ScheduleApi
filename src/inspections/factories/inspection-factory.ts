import { PrismaClient } from '@prisma/client'
import { initialize } from '../../__generated__/fabbrica'

const prisma = new PrismaClient()

initialize({ prisma })

export const InspectionFactory = defineInspectionFactory()
