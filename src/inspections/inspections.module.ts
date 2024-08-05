import { forwardRef, Module } from '@nestjs/common'
import { InspectionsService } from './inspections.service'
import { InspectionsController } from './inspections.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AppointmentsModule } from 'src/appointments/appointments.module'
import { InspectionsGateway } from './inspections.gateway'

@Module({
  controllers: [InspectionsController],
  imports: [PrismaModule, forwardRef(() => AppointmentsModule)],
  providers: [InspectionsService, InspectionsGateway],
  exports: [InspectionsService, InspectionsGateway],
})
export class InspectionsModule {}
