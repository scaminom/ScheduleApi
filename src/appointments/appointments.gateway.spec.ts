import { Test, TestingModule } from '@nestjs/testing'
import { AppointmentsGateway } from './appointments.gateway'
import { Server, Socket } from 'socket.io'
import { Appointment } from '@prisma/client'
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

  it('should send appointment to mechanics', () => {
    const appointment = AppointmentFactory.create() as unknown as Appointment

    gateway.sendAppointmentToMechanics(appointment)

    expect(server.to).toHaveBeenCalledWith('mechanics')
    expect(server.emit).toHaveBeenCalledWith('new-appointment', appointment)
  })

  it('should handle join mechanics room', () => {
    const client: Socket = {
      join: jest.fn(),
    } as any

    gateway.handleJoinMechanicsRoom(client)

    expect(client.join).toHaveBeenCalledWith('mechanics')
  })
})
