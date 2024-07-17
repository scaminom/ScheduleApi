import { Module } from '@nestjs/common'
import { AppointmentsService } from './appointments.service'
import { ApointmentsController } from './appointments.controller'
import { VehiclesService } from 'src/vehicles/vehicles.service'
import { AppoitmentValidator } from './validators/CreateAppoitmentValidator'
import { VehiclesModule } from 'src/vehicles/vehicles.module'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [ApointmentsController],
  providers: [AppointmentsService, VehiclesService, AppoitmentValidator],
  imports: [VehiclesModule, PrismaModule],
  exports: [AppoitmentValidator, AppointmentsService],
})
export class AppointmentsModule {}
