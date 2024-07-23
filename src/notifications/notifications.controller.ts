import { Controller, Post, Body, Logger } from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import * as webpush from 'web-push'

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('subscribe')
  @ApiOperation({ summary: 'Subscribe to notifications' })
  @ApiResponse({
    status: 201,
    description: 'The subscription has been successfully created.',
  })
  async subscribe(@Body() subscription: webpush.PushSubscription) {
    // Guarda la suscripción en tu base de datos
    Logger.log('Received subscription:', subscription)
    // Aquí deberías guardar la suscripción en tu base de datos
  }
}
