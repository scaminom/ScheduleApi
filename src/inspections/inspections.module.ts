import { forwardRef, Module } from '@nestjs/common'
import { InspectionsService } from './inspections.service'
import { InspectionsController } from './inspections.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AppointmentsModule } from 'src/appointments/appointments.module'

@Module({
  controllers: [InspectionsController],
  imports: [PrismaModule, forwardRef(() => AppointmentsModule)],
  providers: [InspectionsService],
  exports: [InspectionsService],
})
export class InspectionsModule {}
