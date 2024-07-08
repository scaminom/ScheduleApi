import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { environments } from './config/environments'

import config from './config/config'
import { AuthModule } from './auth/auth.module'
import { VehiclesModule } from './vehicles/vehicles.module'
import { ApointmentsModule } from './appoitments/appointments.module'
import { RemindersModule } from './reminders/reminders.module'
import { InspectionsModule } from './inspections/inspections.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV],
      load: [config],
      isGlobal: true,
    }),
    AuthModule,
    RemindersModule,
    UsersModule,
    VehiclesModule,
    ApointmentsModule,
    InspectionsModule,
    JobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
