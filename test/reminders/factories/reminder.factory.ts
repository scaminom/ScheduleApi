import { PrismaClient } from '@prisma/client'
import {
  defineReminderFactory,
  initialize,
} from '../../../src/__generated__/fabbrica'
import { UserFactory } from '../../users/factories/user.factory'

const prisma = new PrismaClient()
initialize({ prisma })
export const ReminderFactory = defineReminderFactory({
  defaultData: {
    user: UserFactory,
  },
})
