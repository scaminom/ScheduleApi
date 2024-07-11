import { Test, TestingModule } from '@nestjs/testing'
import { VehiclesService } from './vehicles.service'
import { VehicleFactory } from './factories/vehicle.factory'
import { PrismaService } from '../prisma/prisma.service'

const prismaMock = {
  vehicle: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}

describe('VehiclesService', () => {
  let service: VehiclesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile()

    service = module.get<VehiclesService>(VehiclesService)

    prismaMock.vehicle.findMany.mockReset()
    prismaMock.vehicle.findUnique.mockReset()
    prismaMock.vehicle.create.mockReset()
  })

  it('should return an array of vehicles', async () => {
    const vehiclesCreated = await Promise.all(
      Array.from({ length: 2 }, () => VehicleFactory.create()),
    )
    prismaMock.vehicle.findMany.mockResolvedValue(vehiclesCreated)

    const vehicles = await service.findAll({})

    expect(Array.isArray(vehicles)).toBe(true)
    expect(vehicles).toEqual(vehiclesCreated)
    expect(prismaMock.vehicle.findMany).toHaveBeenCalledTimes(1)
  })

  it('should return a vehicle', async () => {
    const vehicleMock = await VehicleFactory.create()
    prismaMock.vehicle.findUnique.mockResolvedValue(vehicleMock)

    const vehicle = await service.findOne(vehicleMock.id)
    expect(vehicle).toBe(vehicleMock)
  })

  it('should return a vehicle with a unique plate', async () => {
    const vehicleMock = await VehicleFactory.create()
    prismaMock.vehicle.create.mockResolvedValueOnce(vehicleMock)

    const vehicle = await VehicleFactory.create({ plate: 'ABC-126' })

    expect(vehicle.plate).not.toBe('ABC-125')
    expect(vehicle.plate).toBe('ABC-126')
  })

  it('should throw an error if the vehicle is not found', async () => {
    jest.spyOn(prismaMock.vehicle, 'findUnique').mockResolvedValue(null)

    await expect(service.findOne(1)).rejects.toThrow()
  })

  it('should create a vehicle', async () => {
    jest
      .spyOn(prismaMock.vehicle, 'create')
      .mockResolvedValue(await VehicleFactory.create())

    const vehicle = await service.create(await VehicleFactory.create())
    expect(vehicle).toHaveProperty('id')
  })
})
