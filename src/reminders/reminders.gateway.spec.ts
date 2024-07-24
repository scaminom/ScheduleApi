import { Test, TestingModule } from '@nestjs/testing'
import { RemindersGateway } from './reminders.gateway'
import { Server, Socket } from 'socket.io'
import { ReminderFactory } from './factories/reminder.factory'
import { UserFactory } from 'src/users/factories/user.factory'

describe('RemindersGateway', () => {
  let gateway: RemindersGateway
  let server: Server

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemindersGateway],
    }).compile()

    gateway = module.get<RemindersGateway>(RemindersGateway)
    server = { to: jest.fn().mockReturnThis(), emit: jest.fn() } as any
    gateway.server = server
  })

  it('should send reminder to admins', async () => {
    const user = await UserFactory.create()
    const reminder = await ReminderFactory.create({
      user: {
        create: {
          ...user,
        },
      },
    })

    gateway.broadCastReminderCreation(reminder)

    expect(server.to).toHaveBeenCalledWith('admins')
    expect(server.emit).toHaveBeenCalledWith('reminders-change')
  })

  it('should handle join admins room', () => {
    const client: Socket = {
      join: jest.fn(),
    } as any

    gateway.handleJoinReminderJoin(client)

    expect(client.join).toHaveBeenCalledWith('admins')
  })
})
