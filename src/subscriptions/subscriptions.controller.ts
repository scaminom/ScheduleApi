import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  ParseEnumPipe,
} from '@nestjs/common'
import { SubscriptionsService } from './subscriptions.service'
import { CreateSubscriptionDto } from './dto/create-subscription.dto'
import { Role } from '@prisma/client'

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  async create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return await this.subscriptionsService.create(createSubscriptionDto)
  }

  @Get()
  async findAll() {
    return await this.subscriptionsService.findAll()
  }

  @Get('by-role')
  async findByRole(@Query('role', ParseEnumPipe<Role>) role: Role) {
    return await this.subscriptionsService.findByRole(role)
  }
}
