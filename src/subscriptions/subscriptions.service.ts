import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateSubscriptionDto } from './dto/create-subscription.dto'
import { Role, Subscription } from '@prisma/client'

@Injectable()
export class SubscriptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    delete createSubscriptionDto.subscription.expirationTime

    return await this.prisma.subscription.create({
      data: {
        userRole: createSubscriptionDto.userRole,
        ...createSubscriptionDto.subscription,
      },
    })
  }

  async findAll(): Promise<Subscription[]> {
    return await this.prisma.subscription.findMany()
  }

  async findByRole(userRole: Role): Promise<Subscription[]> {
    return await this.prisma.subscription.findMany({
      where: { userRole },
    })
  }
}
