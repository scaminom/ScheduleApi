import { Test, TestingModule } from '@nestjs/testing'
import { RemindersService } from './reminders.service'
import { PrismaService } from '../prisma/prisma.service'

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
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile()

    service = module.get<RemindersService>(RemindersService)

    prismaMock.reminder.findMany.mockReset()
    prismaMock.reminder.findUnique.mockReset()
  })

  describe('getAllReminders', () => {
    it('should return all reminders', async () => {
      const reminders = [
        {
          id: 1,
          title: 'Reminder 1',
          description: 'Description 1',
          completed: false,
          date: new Date(),
          notificationMinutes: 10,
        },
        {
          id: 2,
          title: 'Reminder 2',
          description: 'Description 2',
          completed: false,
          date: new Date(),
          notificationMinutes: 10,
        },
      ]

      prismaMock.reminder.findMany.mockResolvedValue(reminders)
      const result = await service.getAllReminders()

      expect(result).toBe(reminders)
      expect(prismaMock.reminder.findMany).toHaveBeenCalledTimes(1)
      expect(prismaMock.reminder.findMany).toHaveBeenCalledWith()
    })
  })

  describe('getReminderById', () => {
    it('should return a reminder by id', async () => {
      const reminder = {
        id: 1,
        title: 'Reminder 1',
        description: 'Description 1',
        completed: false,
        date: new Date(),
        notificationMinutes: 10,
      }

      prismaMock.reminder.findUnique.mockResolvedValue(reminder)
      const result = await service.getReminderById(1)

      expect(result).toBe(reminder)
      expect(prismaMock.reminder.findUnique).toHaveBeenCalledTimes(1)
      expect(prismaMock.reminder.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      })
    })
  })

  describe('createReminder', () => {
    it('should create a reminder', async () => {
      const reminder = {
        title: 'Reminder 1',
        description: 'Description 1',
        completed: false,
        date: new Date(),
        notificationMinutes: 10,
        userId: '1',
      }

      const createdReminder = {
        id: 1,
        ...reminder,
      }

      prismaMock.reminder.create.mockResolvedValue(createdReminder)
      const result = await service.createReminder(reminder)

      expect(result).toBe(createdReminder)
      expect(prismaMock.reminder.create).toHaveBeenCalledTimes(1)
      expect(prismaMock.reminder.create).toHaveBeenCalledWith({
        data: reminder,
      })
    })
  })

  describe('updateReminder', () => {
    it('should update a reminder', async () => {
      const reminder = {
        id: 1,
        title: 'Reminder 1',
        description: 'Description 1',
        completed: false,
        date: new Date(),
        notificationMinutes: 10,
      }

      prismaMock.reminder.update.mockResolvedValue(reminder)
      const result = await service.updateReminder(1, reminder)

      expect(result).toBe(reminder)
      expect(prismaMock.reminder.update).toHaveBeenCalledTimes(1)
      expect(prismaMock.reminder.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: reminder,
      })
    })
  })
})
