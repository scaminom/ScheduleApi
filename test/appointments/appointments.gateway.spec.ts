import { Test, TestingModule } from '@nestjs/testing'
import { AppointmentsGateway } from '../../src/appointments/appointments.gateway'
import { Server, Socket } from 'socket.io'
import { UserFactory } from 'test/users/factories/user.factory'
import { AppointmentFactory } from './factories/appointment-factory'

describe('AppointmentsGateway', () => {
  let gateway: AppointmentsGateway
  let server: Server

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentsGateway],
    }).compile()

    gateway = module.get<AppointmentsGateway>(AppointmentsGateway)
    server = { to: jest.fn().mockReturnThis(), emit: jest.fn() } as any
    gateway.server = server
  })

  it('should send appointment to mechanics', async () => {
    const user = await UserFactory.create()
    const appointment = await AppointmentFactory.create({
      user: {
        create: {
          ...user,
        },
      },
    })

    gateway.broadcastAppointmentCreation({ ...appointment, user })

    expect(server.to).toHaveBeenCalledWith('mechanics')
    expect(server.emit).toHaveBeenCalledWith('appointments-change')
  })

  it('should handle join mechanics room', () => {
    const client: Socket = {
      join: jest.fn(),
    } as any

    gateway.handleJoinMechanicsRoom(client)

    expect(client.join).toHaveBeenCalledWith('mechanics')
  })
})
