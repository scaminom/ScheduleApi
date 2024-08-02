import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import { SubscriptionsService } from './subscriptions.service'
import { CreateSubscriptionDto } from './dto/create-subscription.dto'
import { Role } from '@prisma/client'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UpdateSubscriptionDto } from './dto/update-subscription.dto'

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new subscription' })
  @ApiResponse({
    status: 201,
    description: 'The record encypted.',
    example: { id: '1', userCI: '123', available: true },
  })
  async create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return await this.subscriptionsService.create(createSubscriptionDto)
  }

  // @Get()
  // @ApiOperation({ summary: 'Get all subscriptions' })
  // @ApiResponse({ status: 200, description: 'List of subscriptions.' })
  // async findAll() {
  //   return await this.subscriptionsService.findAll()
  // }

  @Get(':id')
  @ApiOperation({ summary: 'Get a subscription by id' })
  @ApiResponse({ status: 200, description: 'The subscription.' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ id: number; userCI: string; available: boolean }> {
    return await this.subscriptionsService.findOne(id)
  }

  @Get('by-role')
  @ApiOperation({ summary: 'Get all subscriptions by role' })
  @ApiResponse({ status: 200, description: 'List of subscriptions.' })
  async findByRole(@Query('role') role: Role) {
    return await this.subscriptionsService.findByRole(role)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a subscription' })
  @ApiResponse({ status: 200, description: 'The updated subscription.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<{ id: number; userCI: string; available: boolean }> {
    return await this.subscriptionsService.update(id, updateSubscriptionDto)
  }
}
