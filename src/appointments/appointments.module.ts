import { forwardRef, Module } from '@nestjs/common'
import { AppointmentsService } from './appointments.service'
import { AppointmentsController } from './appointments.controller'
import { AppoitmentValidator } from './validators/CreateAppointmentValidator'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UsersModule } from 'src/users/users.module'
import { AppointmentsGateway } from './appointments.gateway'
import { InspectionsModule } from 'src/inspections/inspections.module'
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module'
import { NotificationsModule } from 'src/notifications/notifications.module'
import { AppointmentsBackgroundService } from './appointments.background.service'

@Module({
  controllers: [AppointmentsController],
  providers: [
    AppointmentsService,
    AppoitmentValidator,
    AppointmentsGateway,
    AppointmentsBackgroundService,
  ],
  imports: [
    PrismaModule,
    UsersModule,
    SubscriptionsModule,
    NotificationsModule,
    forwardRef(() => InspectionsModule),
  ],
  exports: [
    AppoitmentValidator,
    AppointmentsService,
    AppointmentsBackgroundService,
  ],
})
export class AppointmentsModule {}
