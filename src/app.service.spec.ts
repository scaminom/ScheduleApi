import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { ConfigService, ConfigModule } from '@nestjs/config';
import config from './config';

describe('AppService', () => {
  let appService: AppService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [config] })],
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should return the DATABASE_URL from config', () => {
    const databaseUrl = configService.get<string>('DATABASE_URL');
    const result = appService.getHello();
    expect(result).toEqual(databaseUrl);
  });
});
