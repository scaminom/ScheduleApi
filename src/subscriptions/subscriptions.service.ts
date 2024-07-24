import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateSubscriptionDto } from './dto/create-subscription.dto'
import { Prisma, Role, Subscription } from '@prisma/client'
import { SubscriptionNotFoundException } from './exceptions/subscription-not-found'
import { CryptoService } from 'src/crypto/crypto.service'
import { UpdateSubscriptionDto } from './dto/update-subscription.dto'

@Injectable()
export class SubscriptionsService {
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

  async create(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<{ id: number; userCI: string; available: boolean }> {
    delete createSubscriptionDto.subscription.expirationTime

    const encriptedEndpoint = await this.cryptoService.encryptString(
      createSubscriptionDto.subscription.endpoint,
    )
    const subscription = await this.prisma.subscription.create({
      data: {
        userCI: createSubscriptionDto.userCI,
        ...createSubscriptionDto.subscription,
        endpoint: encriptedEndpoint,
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

  async findOne(id: number): Promise<Subscription> {
    const subscription = await this.subscription({ id })

    if (!subscription) {
      throw new SubscriptionNotFoundException()
    }

    return subscription
  }
}
