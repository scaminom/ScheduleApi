import { Prisma } from '@prisma/client'

export const UserSelectInput: Prisma.UserDefaultArgs = {
  select: {
    ci: true,
    color: true,
    firstName: true,
    lastName: true,
    role: true,
  },
}
