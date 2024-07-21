import { Module } from '@nestjs/common'
import { AppointmentsService } from './appointments.service'
import { AppointmentsController } from './appointments.controller'
import { AppoitmentValidator } from './validators/CreateAppointmentValidator'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UsersModule } from 'src/users/users.module'
import { AppointmentsGateway } from './appointments.gateway'

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService, AppoitmentValidator, AppointmentsGateway],
  imports: [PrismaModule, UsersModule],
  exports: [AppoitmentValidator, AppointmentsService],
})
export class AppointmentsModule {}
