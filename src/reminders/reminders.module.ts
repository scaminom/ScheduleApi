import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { RemindersController } from './reminders.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [RemindersController],
  providers: [RemindersService],
  exports: [RemindersService],
  imports: [PrismaModule],
})
export class RemindersModule {}
