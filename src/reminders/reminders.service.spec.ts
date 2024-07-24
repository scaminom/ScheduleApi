import { Test, TestingModule } from '@nestjs/testing'
import { RemindersService } from './reminders.service'
import { PrismaService } from '../prisma/prisma.service'
import { ReminderFactory } from './factories/reminder.factory'
import { RemindersGateway } from './reminders.gateway'

const prismaMock = {
  reminder: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}

describe('RemindersService', () => {
  let service: RemindersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemindersService,
        RemindersGateway,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile()

    service = module.get<RemindersService>(RemindersService)

    prismaMock.reminder.findMany.mockReset()
    prismaMock.reminder.findUnique.mockReset()
    prismaMock.reminder.create.mockReset()
    prismaMock.reminder.update.mockReset()
    prismaMock.reminder.delete.mockReset()
  })

  it('should return an array of reminders', async () => {
    const remindersCreated = await Promise.all(
      Array.from({ length: 2 }, () => ReminderFactory.create()),
    )
    prismaMock.reminder.findMany.mockResolvedValue(remindersCreated)

    const reminders = await service.getAllReminders()

    expect(Array.isArray(reminders)).toBe(true)
    expect(reminders).toEqual(remindersCreated)
    expect(prismaMock.reminder.findMany).toHaveBeenCalledTimes(1)
  })

  it('should return a reminder', async () => {
    const reminderMock = await ReminderFactory.create()
    prismaMock.reminder.findUnique.mockResolvedValue(reminderMock)

    const reminder = await service.getReminderById(reminderMock.id)

    expect(reminder).toBe(reminderMock)
    expect(prismaMock.reminder.findUnique).toHaveBeenCalledTimes(1)
  })

  // it('should create a reminder', async () => {
  //   const reminderMock = await ReminderFactory.create()
  //   prismaMock.reminder.create.mockResolvedValue(reminderMock)

  //   const reminder = await service.createReminder(reminderMock)

  //   expect(reminder).toBe(reminderMock)
  //   expect(prismaMock.reminder.create).toHaveBeenCalledTimes(1)
  // })
})
