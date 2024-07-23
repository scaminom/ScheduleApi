import { Controller, Post, Body, Get, Query } from '@nestjs/common'
import { SubscriptionsService } from './subscriptions.service'
import { CreateSubscriptionDto } from './dto/create-subscription.dto'
import { Role } from '@prisma/client'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new subscription' })
  @ApiResponse({
    status: 201,
    description: 'The record  has been successfully created.',
  })
  async create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return await this.subscriptionsService.create(createSubscriptionDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all subscriptions' })
  @ApiResponse({ status: 200, description: 'List of subscriptions.' })
  async findAll() {
    return await this.subscriptionsService.findAll()
  }

  @Get('by-role')
  @ApiOperation({ summary: 'Get all subscriptions by role' })
  @ApiResponse({ status: 200, description: 'List of subscriptions.' })
  async findByRole(@Query('role') role: Role) {
    return await this.subscriptionsService.findByRole(role)
  }
}
