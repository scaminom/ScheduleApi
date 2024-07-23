import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateSubscriptionDto } from './dto/create-subscription.dto'
import { Role } from '@prisma/client'

@Injectable()
export class SubscriptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    return await this.prisma.subscription.create({
      data: createSubscriptionDto,
    })
  }

  async findAll() {
    return await this.prisma.subscription.findMany()
  }

  async findByRole(userRole: Role) {
    return await this.prisma.subscription.findMany({
      where: { userRole },
    })
  }
}
