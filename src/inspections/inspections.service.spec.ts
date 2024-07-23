import { Test, TestingModule } from '@nestjs/testing'
import { InspectionsService } from './inspections.service'
import { PrismaService } from '../prisma/prisma.service'
import {
  InspectionNotFoundException,
  InspectionPastDateException,
} from './exceptions'
import { InspectionFactory } from './factories/inspection-factory'
import { AppointmentsService } from '../appointments/appointments.service'
import { CreateInspectionDto } from './dto/create-inspection.dto'
import { UpdateInspectionDto } from './dto/update-inspection.dto'
import fakerEs from 'src/faker/faker.config'
import { forwardRef } from '@nestjs/common'
import { AppointmentsModule } from 'src/appointments/appointments.module'

describe('InspectionsService', () => {
  let service: InspectionsService
  let prismaService: PrismaService
  let appointmentsService: AppointmentsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InspectionsService,
        {
          provide: PrismaService,
          useValue: {
            inspection: {
              findUnique: jest.fn(),
              findMany: jest.fn(),
              findFirst: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        {
          provide: AppointmentsService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
      imports: [forwardRef(() => AppointmentsModule)],
    }).compile()

    service = module.get<InspectionsService>(InspectionsService)
    prismaService = module.get<PrismaService>(PrismaService)
    appointmentsService = module.get<AppointmentsService>(AppointmentsService)
  })

  // describe('create', () => {
  //   it('should create an inspection successfully', async () => {
  //     const createInput = await InspectionFactory.buildCreateInput()
  //     const dto = new CreateInspectionDto()
  //     Object.assign(dto, { ...createInput, jobs: undefined })
  //     console.log(dto)

  //     jest
  //       .spyOn(appointmentsService, 'findOne')
  //       .mockImplementation(async () => undefined)
  //     jest
  //       .spyOn(prismaService.inspection, 'create')
  //       .mockResolvedValueOnce({ id: 1, ...dto, endDate: null })

  //     expect(prismaService.inspection.create).toHaveBeenCalledWith({
  //       data: expect.any(Object),
  //     })
  //   })

  //   it('should throw InspectionPastDateException if the date is in the past', async () => {
  //     const createInput = await InspectionFactory.buildCreateInput({
  //       startDate: fakerEs.date.past(),
  //     })
  //     const dto = new CreateInspectionDto()
  //     Object.assign(dto, createInput)

  //     jest
  //       .spyOn(appointmentsService, 'findOne')
  //       .mockImplementation(async () => undefined)
  //     jest.spyOn(prismaService.inspection, 'findFirst').mockResolvedValueOnce({
  //       id: 1,
  //       ...dto,
  //       endDate: null,
  //     })

  //     await expect(service.create(dto)).rejects.toThrow(
  //       InspectionPastDateException,
  //     )
  //   })
  // })

  describe('findOne', () => {
    it('should return an inspection if it exists', async () => {
      const inspection = await InspectionFactory.create()
      jest
        .spyOn(prismaService.inspection, 'findUnique')
        .mockResolvedValueOnce(inspection)

      const result = await service.findOne(inspection.id)
      expect(result).toEqual(inspection)
    })

    it('should throw InspectionNotFoundException if the inspection does not exist', async () => {
      const inspectionId = 9999999999
      jest
        .spyOn(prismaService.inspection, 'findUnique')
        .mockResolvedValueOnce(null)

      await expect(service.findOne(inspectionId)).rejects.toThrow(
        InspectionNotFoundException,
      )
    })
  })

  describe('update', () => {
    it('should update an inspection successfully', async () => {
      const inspection = await InspectionFactory.create()
      const dto = new UpdateInspectionDto()
      Object.assign(dto, {
        startDate: fakerEs.date.soon({ days: 2 }),
        endDate: fakerEs.date.future(),
        jobs: undefined,
      })

      jest.spyOn(prismaService.inspection, 'findUnique').mockResolvedValueOnce({
        ...inspection,
        ...dto,
      })
      jest
        .spyOn(appointmentsService, 'findOne')
        .mockImplementation(async () => undefined)
      jest
        .spyOn(prismaService.inspection, 'update')
        .mockResolvedValueOnce({ ...inspection, ...dto })

      const result = await service.update(inspection.id, dto)
      expect(prismaService.inspection.update).toHaveBeenCalledWith({
        where: { id: inspection.id },
        data: expect.any(Object),
      })
      expect(result).toEqual({ ...inspection, ...dto })
    })
  })

  describe('remove', () => {
    it('should remove an inspection successfully', async () => {
      const inspection = await InspectionFactory.create()
      jest
        .spyOn(prismaService.inspection, 'delete')
        .mockResolvedValueOnce({ ...inspection, id: 1 })

      jest
        .spyOn(prismaService.inspection, 'findUnique')
        .mockResolvedValueOnce(inspection)

      const result = await service.remove(inspection.id)
      expect(prismaService.inspection.delete).toHaveBeenCalledWith({
        where: { id: inspection.id },
      })
      expect(result).toEqual(inspection)
    })

    it('should throw InspectionNotFoundException if the inspection to remove does not exist', async () => {
      const inspectionId = 99999
      jest
        .spyOn(prismaService.inspection, 'findUnique')
        .mockResolvedValueOnce(null)

      await expect(service.remove(inspectionId)).rejects.toThrow(
        InspectionNotFoundException,
      )
    })
  })
})
