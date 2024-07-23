import { Controller, Post, Body } from '@nestjs/common'
import { NotificationsService } from './notifications.service'

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('subscribe')
  async subscribe(@Body() subscription: any) {
    // Guarda la suscripción en tu base de datos
    console.log('Received subscription:', subscription)
    // Aquí deberías guardar la suscripción en tu base de datos
  }
}
