import { Test, TestingModule } from '@nestjs/testing'
import { VehiclesService } from './vehicles.service'

describe('VehiclesService', () => {
  let service: VehiclesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehiclesService],
    }).compile()

    service = module.get<VehiclesService>(VehiclesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return an array of vehicles', async () => {
    const vehicles = await service.findAll()
    expect(vehicles).toBeInstanceOf(Array)
  })

  it('should return a vehicle', async () => {
    const vehicle = await service.findOne(1)
    expect(vehicle).toHaveProperty('id')
  })

  it('should return a vehicle', async () => {
    const vehicle = await service.create({
      model: 'Ferrari',
      year: 2021,
      price: 1000000,
    })
    expect(vehicle).toHaveProperty('id')
  })
})
