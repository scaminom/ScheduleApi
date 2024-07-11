import { Test, TestingModule } from '@nestjs/testing'
import { RemindersGateway } from './reminders.gateway'
import { Server } from 'socket.io'
import { Reminder } from '@prisma/client'
import { ReminderFactory } from './factories/reminder.factory'

describe('RemindersGateway', () => {
  let gateway: RemindersGateway
  let server: Server

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemindersGateway],
    }).compile()

    gateway = module.get<RemindersGateway>(RemindersGateway)
    server = gateway.server = new Server()
  })

  it('should be defined', () => {
    expect(gateway).toBeDefined()
  })

  it('should emit reminder', () => {
    const reminder = ReminderFactory.create() as unknown as Reminder

    const emitSpy = jest.spyOn(server, 'emit')

    gateway.sendReminder(reminder)

    expect(emitSpy).toHaveBeenCalledWith('reminder', reminder)
  })
})
