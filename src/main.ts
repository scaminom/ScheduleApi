import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { RemindersBackgroundService } from './reminders/reminders.background.service'
import { AppointmentsBackgroundService } from './appointments/appointments.background.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Schedule API')
      .addBearerAuth()
      .addSecurityRequirements('bearer')
      .setDescription('API to manage schedules of a company')
      .setVersion('1.0')
      .build()

    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup('api', app, document)
  }

  const reminderBackgroundService = app.get(RemindersBackgroundService)

  const appointmentBackgroundService = app.get(AppointmentsBackgroundService)

  setInterval(() => {
    reminderBackgroundService.checkReminders()
    appointmentBackgroundService.checkAppointments()
  }, 60000)

  app.enableCors()

  await app.listen(process.env.PORT || 3000)
  Logger.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
