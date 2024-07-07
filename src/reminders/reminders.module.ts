import { Module } from '@nestjs/common'
import { RemindersService } from './reminders.service'
import { RemindersController } from './reminders.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { RemindersGateway } from './reminders.gateway'
import { BackgroundService } from './background.service'

@Module({
  controllers: [RemindersController],
  providers: [RemindersService, RemindersGateway, BackgroundService],
  exports: [RemindersService],
  imports: [PrismaModule],
})
export class RemindersModule {}
