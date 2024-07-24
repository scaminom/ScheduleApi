import { Prisma } from '@prisma/client'

export interface IAppointmentWithUser
  extends Prisma.AppointmentGetPayload<{
    include: {
      user: {
        select: {
          firstName: true
          lastName: true
          ci: true
          role: true
        }
      }
    }
  }> {}
