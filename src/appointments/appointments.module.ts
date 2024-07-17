import { Module } from '@nestjs/common'
import { AppointmentsService } from './appointments.service'
import { AppointmentsController } from './appointments.controller'
import { VehiclesService } from 'src/vehicles/vehicles.service'
import { AppoitmentValidator } from './validators/CreateAppointmentValidator'
import { VehiclesModule } from 'src/vehicles/vehicles.module'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UsersModule } from 'src/users/users.module'

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService, VehiclesService, AppoitmentValidator],
  imports: [VehiclesModule, PrismaModule, UsersModule],
  exports: [AppoitmentValidator, AppointmentsService],
})
export class AppointmentsModule {}
