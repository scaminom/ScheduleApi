import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateSubscriptionDto } from './dto/create-subscription.dto'
import { Prisma, Role, Subscription } from '@prisma/client'
import { SubscriptionNotFoundException } from './exceptions/subscription-not-found'
import { CryptoService } from 'src/crypto/crypto.service'
import { UpdateSubscriptionDto } from './dto/update-subscription.dto'
import { SubscriptionAlreadyExistsException } from './exceptions/subscription-already-exists'

@Injectable()
export class SubscriptionsService {
  private readonly logger = new Logger(SubscriptionsService.name)
  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptoService: CryptoService,
  ) {}

  async subscription(
    params: Prisma.SubscriptionWhereUniqueInput,
  ): Promise<Subscription | null> {
    return await this.prisma.subscription.findUnique({
      where: params,
    })
  }

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const encriptedEndpoint = await this.cryptoService.encryptString(
      createSubscriptionDto.token,
    )

    const subscriptions = await this.findAllByUser(createSubscriptionDto.userCI)
    if (subscriptions.length > 0) {
      const promise = subscriptions.map(async (subscription) => {
        const decrypted = await this.cryptoService.decryptString(
          subscription.token,
        )
        if (decrypted === createSubscriptionDto.token) {
          throw new SubscriptionAlreadyExistsException()
        }
        return subscription
      })

      await Promise.all(promise)
    }

    const subscriptionTokenAlreadyExists =
      await this.prisma.subscription.findFirst({
        where: { token: encriptedEndpoint },
      })

    if (subscriptionTokenAlreadyExists) {
      throw new SubscriptionAlreadyExistsException()
    }

    const subscription = await this.prisma.subscription.create({
      data: {
        userCI: createSubscriptionDto.userCI,
        token: encriptedEndpoint,
      },
    })

    return {
      id: subscription.id,
      userCI: subscription.userCI,
      available: subscription.available,
    }
  }

  async update(id: number, UpdateSubscriptionDto: UpdateSubscriptionDto) {
    const subscription = await this.findOne(id)

    if (!subscription) {
      throw new SubscriptionNotFoundException()
    }

    const subscriptionUpdated = await this.prisma.subscription.update({
      where: { id },
      data: UpdateSubscriptionDto,
    })

    return {
      id: subscriptionUpdated.id,
      userCI: subscriptionUpdated.userCI,
      available: subscriptionUpdated.available,
    }
  }

  async findAllByUser(userCI: string): Promise<Subscription[]> {
    return await this.prisma.subscription.findMany({
      where: {
        userCI,
      },
    })
  }

  async findAll(): Promise<Subscription[]> {
    return await this.prisma.subscription.findMany()
  }

  async findByRole(userRole: Role): Promise<Subscription[]> {
    return await this.prisma.subscription.findMany({
      where: {
        user: {
          role: userRole,
        },
        available: true,
      },
    })
  }

  async findByRoles(userRoles: Role[]): Promise<Subscription[]> {
    return await this.prisma.subscription.findMany({
      where: {
        user: {
          role: {
            in: userRoles,
          },
        },
        available: true,
      },
    })
  }

  async findOne(
    id: number,
  ): Promise<{ id: number; userCI: string; available: boolean }> {
    const subscription = await this.subscription({ id })

    if (!subscription) {
      throw new SubscriptionNotFoundException()
    }

    return {
      id: subscription.id,
      userCI: subscription.userCI,
      available: subscription.available,
    }
  }

  async deleteSubscription(token: string) {
    try {
      const subscription = await this.prisma.subscription.findFirst({
        where: { token },
      })

      if (!subscription) {
        throw new SubscriptionNotFoundException()
      }

      await this.prisma.subscription.delete({
        where: { id: subscription.id },
      })
    } catch (error) {
      this.logger.error(error)
    }
  }

  async disableSubscriptionsByUser(userCI: string) {
    return await this.prisma.subscription.updateMany({
      where: { userCI },
      data: { available: false },
    })
  }
}
