import { Module } from '@nestjs/common'
import { RemindersService } from './reminders.service'
import { RemindersController } from './reminders.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { RemindersGateway } from './reminders.gateway'
import { RemindersBackgroundService } from './reminders.background.service'
import { NotificationsModule } from 'src/notifications/notifications.module'
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module'

@Module({
  controllers: [RemindersController],
  providers: [RemindersService, RemindersGateway, RemindersBackgroundService],
  exports: [RemindersService],
  imports: [PrismaModule, NotificationsModule, SubscriptionsModule],
})
export class RemindersModule {}
