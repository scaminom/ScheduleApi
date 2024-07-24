import { Module } from '@nestjs/common'
import { UserService } from './users.service'
import { UsersController } from './users.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module'

@Module({
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
  imports: [PrismaModule, SubscriptionsModule],
})
export class UsersModule {}
