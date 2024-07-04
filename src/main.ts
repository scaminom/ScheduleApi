import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

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
    .setDescription('API to manage schedules of a company')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document)
  await app.listen(process.env.PORT || 3001)
}
bootstrap()
