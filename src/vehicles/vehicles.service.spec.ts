import { Test, TestingModule } from '@nestjs/testing'
import { VehiclesService } from './vehicles.service'
import { VehicleFactory } from './factories/vehicle.factory'
import { PrismaService } from '../prisma/prisma.service'

describe('VehiclesService', () => {
  let service: VehiclesService
  let prisma: PrismaService

  beforeEach(async () => {
    prisma = {
      vehicle: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
      },
    } as unknown as PrismaService

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile()

    service = module.get<VehiclesService>(VehiclesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return an array of vehicles', async () => {
    jest
      .spyOn(prisma.vehicle, 'findMany')
      .mockResolvedValue([await VehicleFactory.create()])

    const vehicles = await service.findAll({})

    expect(vehicles).toBeInstanceOf(Array)
  })

  it('should return a vehicle', async () => {
    jest
      .spyOn(prisma.vehicle, 'findUnique')
      .mockResolvedValue(await VehicleFactory.create())
    const vehicle = await service.findOne(1)
    expect(vehicle).toHaveProperty('id')
  })

  it('should return a vehicle', async () => {
    jest
      .spyOn(prisma.vehicle, 'findUnique')
      .mockResolvedValue(await VehicleFactory.create({ plate: 'ABC-125' }))
    const vehicle = await VehicleFactory.create({ plate: 'ABC-126' })
    expect(vehicle).toHaveProperty('id')
  })
})
