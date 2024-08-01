import { PrismaService } from 'src/prisma/prisma.service'
import { UserNotFoundException } from 'src/users/exceptions/user-not-found'

export async function validateUserExistence(
  prismaService: PrismaService,
  userCI: string,
): Promise<void> {
  if (!userCI || !prismaService) {
    throw new Error('The user CI and prisma service are required')
  }

  const user = await prismaService.user.findUnique({
    where: {
      ci: userCI,
      deletedAt: null,
    },
  })

  if (!user) {
    throw new UserNotFoundException(userCI)
  }
}
