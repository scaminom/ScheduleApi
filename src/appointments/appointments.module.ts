import { forwardRef, Module } from '@nestjs/common'
import { AppointmentsService } from './appointments.service'
import { AppointmentsController } from './appointments.controller'
import { AppoitmentValidator } from './validators/CreateAppointmentValidator'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UsersModule } from 'src/users/users.module'
import { AppointmentsGateway } from './appointments.gateway'
import { InspectionsModule } from 'src/inspections/inspections.module'

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService, AppoitmentValidator, AppointmentsGateway],
  imports: [PrismaModule, UsersModule, forwardRef(() => InspectionsModule)],
  exports: [AppoitmentValidator, AppointmentsService],
})
export class AppointmentsModule {}
