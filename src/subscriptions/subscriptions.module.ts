import { Module } from '@nestjs/common'
import { SubscriptionsService } from './subscriptions.service'
import { SubscriptionsController } from './subscriptions.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  providers: [SubscriptionsService],
  controllers: [SubscriptionsController],
  exports: [SubscriptionsService],
  imports: [PrismaModule],
})
export class SubscriptionsModule {}
