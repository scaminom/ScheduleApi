import { Test, TestingModule } from '@nestjs/testing';
import { RemindersGateway } from './reminders.gateway';

describe('RemindersGateway', () => {
  let gateway: RemindersGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemindersGateway],
    }).compile();

    gateway = module.get<RemindersGateway>(RemindersGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
