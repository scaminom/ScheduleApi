import { Injectable } from '@nestjs/common'
import { CreateVehicleDto } from './dto/create-vehicle.dto'
import { UpdateVehicleDto } from './dto/update-vehicle.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createVehicleDto: CreateVehicleDto) {
    return await this.prisma.vehicle.create({
      data: createVehicleDto,
    })
  }

  async findAll() {
    return await this.prisma.vehicle.findMany()
  }

  async findOne(id: number) {
    return await this.prisma.vehicle.findUnique({
      where: { id },
    })
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
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
