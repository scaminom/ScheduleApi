import { Test, TestingModule } from '@nestjs/testing'
import { AppService } from '../src/app.service'
import { ConfigService, ConfigModule } from '@nestjs/config'
import config from '../src/config/config'

describe('AppService', () => {
  let appService: AppService
  let configService: ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [config] })],
      providers: [AppService],
    }).compile()

    appService = module.get<AppService>(AppService)
    configService = module.get<ConfigService>(ConfigService)
  })

  it('should return the CONTAINER_NAME from config', () => {
    const containerName = configService.get<string>('CONTAINER_NAME')
    const result = appService.getHello()
    expect(result).toEqual(containerName)
  })
})
