import { Injectable } from '@nestjs/common'
import { CreateVehicleDto } from './dto/create-vehicle.dto'
import { UpdateVehicleDto } from './dto/update-vehicle.dto'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma, Vehicle } from '@prisma/client'
import { VehicleAlreadyExistsException } from './exceptions/vehicle-already-exits'
import { VehicleNotFoundException } from './exceptions/vehicle-not-found'

@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const { plate } = createVehicleDto

    const vehicle = await this.vehicle({ plate })

    if (vehicle) {
      throw new VehicleAlreadyExistsException(plate)
    }

    return await this.prisma.vehicle.create({
      data: createVehicleDto,
    })
  }

  private async vehicle(
    vehicleWhereUniqueInput: Prisma.VehicleWhereUniqueInput,
  ) {
    const { id } = vehicleWhereUniqueInput

    const vehicle = await this.prisma.vehicle.findUnique({
      where: {
        id,
      },
    })

    return vehicle
  }

  async findOne(id: number) {
    const vehicle = await this.vehicle({ id })

    if (!vehicle) {
      throw new VehicleNotFoundException(id)
    }

    return vehicle
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.VehicleWhereUniqueInput
    where?: Prisma.VehicleWhereInput
    orderBy?: Prisma.VehicleOrderByWithRelationInput
  }) {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.vehicle.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    const vehicle = await this.vehicle({ id })

    if (!vehicle) {
      throw new VehicleNotFoundException(id)
    }

    return await this.prisma.vehicle.update({
      where: { id },
      data: updateVehicleDto,
    })
  }

  async remove(id: number) {
    return await this.prisma.vehicle.delete({
      where: { id },
    })
  }
}
