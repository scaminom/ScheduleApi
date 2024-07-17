import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { BackgroundService } from './reminders/background.service'

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

  const config = new DocumentBuilder()
    .setTitle('Schedule API')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .setDescription('API to manage schedules of a company')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document)

  const backgroundService = app.get(BackgroundService)

  setInterval(() => {
    backgroundService.checkReminders()
  }, 60000)

  await app.listen(process.env.PORT || 3001)
  Logger.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
