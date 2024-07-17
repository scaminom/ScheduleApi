import { Test, TestingModule } from '@nestjs/testing'
import { AppointmentsService } from './appointments.service'
import { PrismaService } from '../prisma/prisma.service'
import { AppoitmentValidator } from './validators/CreateAppointmentValidator'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'
import {
  AppointmentPastDateException,
  AppointmentLaboralHoursException,
  AppointmentAlreadyExitsException,
  AppointmentLimitPerHourException,
} from './exceptions'
import { VehicleNotFoundException } from '../vehicles/exceptions/vehicle-not-found'
import { AppointmentFactory } from './factories/appointment-factory'
import { Appointment } from '@prisma/client'

describe('AppointmentsService', () => {
  let service: AppointmentsService
  let prismaService: PrismaService
  let validateAppointment: AppoitmentValidator

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        {
          provide: PrismaService,
          useValue: {
            appointment: {
              findUnique: jest.fn(),
              findMany: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
            },
          },
        },
        {
          provide: AppoitmentValidator,
          useValue: {
            validate: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<AppointmentsService>(AppointmentsService)
    prismaService = module.get<PrismaService>(PrismaService)
    validateAppointment = module.get<AppoitmentValidator>(AppoitmentValidator)
  })

  describe('create', () => {
    it('should create an appointment successfully', async () => {
      const appointment = await AppointmentFactory.buildCreateInput()

      const dto = new CreateAppointmentDto()

      const createInput = await AppointmentFactory.buildCreateInput()

      Object.assign(dto, createInput)

      jest
        .spyOn(validateAppointment, 'validate')
        .mockImplementation(async () => undefined)
      jest.spyOn(prismaService.appointment, 'create').mockResolvedValueOnce({
        id: 1,
        ...dto,
        userId: dto.userCI,
        deletedAt: null,
      } as Appointment)

      const result = await service.create(dto)
      expect(prismaService.appointment.create).toHaveBeenCalledWith({
        data: dto,
      })
      expect(result).toEqual({ ...appointment, id: 1 })
    })

    it('should throw an error if vehicle not found during validation', async () => {
      const createInput = await AppointmentFactory.buildCreateInput()

      const dto = new CreateAppointmentDto()
      Object.assign(dto, { ...createInput, vehicleId: 1 })

      jest
        .spyOn(validateAppointment, 'validate')
        .mockRejectedValue(new VehicleNotFoundException(dto.vehicleId))

      await expect(service.create(dto)).rejects.toThrow(
        VehicleNotFoundException,
      )
    })

    it('should throw an error if appointment time is in the past', async () => {
      const createInput = await AppointmentFactory.buildCreateInput({
        date: new Date('2021-01-01'),
      })
      const dto = new CreateAppointmentDto()
      Object.assign(dto, { ...createInput })

      jest
        .spyOn(validateAppointment, 'validate')
        .mockRejectedValue(new AppointmentPastDateException())

      await expect(service.create(dto)).rejects.toThrow(
        AppointmentPastDateException,
      )
    })

    it('should throw an error if appointment time is out of laboral hours', async () => {
      const createInput = await AppointmentFactory.buildCreateInput({
        date: new Date('2021-01-01T18:00:00'),
      })

      const dto = new CreateAppointmentDto()
      Object.assign(dto, { ...createInput })

      jest
        .spyOn(validateAppointment, 'validate')
        .mockRejectedValue(new AppointmentLaboralHoursException())

      await expect(service.create(dto)).rejects.toThrow(
        AppointmentLaboralHoursException,
      )
    })

    it('should throw an error if there is already an appointment at the same time for the mechanic', async () => {
      const createInput = await AppointmentFactory.buildCreateInput()

      const dto = new CreateAppointmentDto()
      Object.assign(dto, { ...createInput })

      jest
        .spyOn(validateAppointment, 'validate')
        .mockRejectedValue(new AppointmentAlreadyExitsException(dto.userCI))

      await expect(service.create(dto)).rejects.toThrow(
        AppointmentAlreadyExitsException,
      )
    })

    it('should throw an error if there are already 3 appointments at the same hour', async () => {
      const dto = new CreateAppointmentDto()
      jest
        .spyOn(validateAppointment, 'validate')
        .mockRejectedValue(new AppointmentLimitPerHourException())

      await expect(service.create(dto)).rejects.toThrow(
        AppointmentLimitPerHourException,
      )
    })
  })

  describe('update', () => {
    it('should update an appointment successfully', async () => {
      const appointment = await AppointmentFactory.create()
      const createInput = await AppointmentFactory.buildCreateInput()
      const dto = new UpdateAppointmentDto()
      Object.assign(dto, createInput)

      if (dto.date) dto.date = new Date(dto.date)

      jest
        .spyOn(validateAppointment, 'validate')
        .mockImplementation(async () => undefined)
      jest
        .spyOn(prismaService.appointment, 'update')
        .mockResolvedValueOnce({ ...appointment, ...dto } as Appointment)

      const result = await service.update(appointment.id, dto)
      expect(prismaService.appointment.update).toHaveBeenCalledWith({
        where: { id: appointment.id },
        data: dto,
      })

      expect(result).toEqual({ ...appointment, ...dto, id: appointment.id })
    })
  })

  describe('remove', () => {
    it('should mark an appointment as deleted', async () => {
      const appointment = await AppointmentFactory.create()
      jest.spyOn(prismaService.appointment, 'update').mockResolvedValueOnce({
        ...appointment,
        deletedAt: new Date(),
      })

      const result = await service.remove(appointment.id)
      expect(prismaService.appointment.update).toHaveBeenCalledWith({
        where: { id: appointment.id },
        data: { deletedAt: expect.any(Date) },
      })
      expect(result).toEqual({ ...appointment, deletedAt: expect.any(Date) })
    })
  })
})
