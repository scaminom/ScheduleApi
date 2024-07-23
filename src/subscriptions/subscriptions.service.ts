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
    return await this.prisma.subscription.create({
      data: createSubscriptionDto,
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
