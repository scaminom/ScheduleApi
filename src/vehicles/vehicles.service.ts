import { Injectable } from '@nestjs/common'
import { CreateVehicleDto } from './dto/create-vehicle.dto'
import { UpdateVehicleDto } from './dto/update-vehicle.dto'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma, Vehicle } from '@prisma/client'
import { VehicleAlreadyExistsException } from './exceptions/vehicle-already-exits'
import { VehicleNotFoundException } from './exceptions/vehicle-not-found'
import { IFindParams } from './interfaces/find-params'

@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a vehicle
   * @param createVehicleDto - The vehicle data to create
   * @returns {Promise<Vehicle>} - The created vehicle
   * @throws {VehicleAlreadyExistsException} - If the vehicle already exists
   * @memberof VehiclesService
   */
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

  /**
   * Find a vehicle by its unique identifier
   * @param vehicleWhereUniqueInput - The unique identifier of the vehicle
   * @returns {Promise<Vehicle | null>} - The vehicle or null if not found
   * @throws {VehicleNotFoundException} - If the vehicle is not found
   * @private
   * @memberof VehiclesService
   */
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

  /**
   * Find a vehicle by its ID
   * @param {number} id - The ID of the vehicle
   * @returns {Promise<Vehicle | null>} - The vehicle or null if not found
   * @throws {VehicleNotFoundException} - If the vehicle is not found
   * @memberof VehiclesService
   * @public
   * @async
   */
  async findOne(id: number) {
    const vehicle = await this.vehicle({ id })

    if (!vehicle) {
      throw new VehicleNotFoundException(id)
    }

    return vehicle
  }

  /**
   * Find all vehicles
   * @param {IFindParams} params - The parameters to filter the vehicles
   * @returns {Promise<Vehicle[]>} - The vehicles
   * @memberof VehiclesService
   * @public
   * @async
   * @example
   * findAll({
   *  skip: 0,
   * take: 10,
   * cursor: { id: 1 },
   * where: { plate: 'ABC123' },
   * orderBy: { plate: 'asc' },
   * })
   */
  async findAll(params: IFindParams) {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.vehicle.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  /**
   * Update a vehicle
   * @param {number} id - The ID of the vehicle
   * @param {UpdateVehicleDto} updateVehicleDto - The vehicle data to update
   * @returns {Promise<Vehicle>} - The updated vehicle
   * @throws {VehicleNotFoundException} - If the vehicle is not found
   * @memberof VehiclesService
   * @public
   * @async
   * @example
   * update(1, { plate: 'XYZ123' })
   * @example
   * update(1, { plate: 'XYZ123', brand: 'Toyota' })
   */
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

  /**
   * Remove a vehicle
   * @param {number} id - The ID of the vehicle
   * @returns {Promise<Vehicle>} - The removed vehicle
   * @throws {VehicleNotFoundException} - If the vehicle is not found
   * @memberof VehiclesService
   * @public
   * @async
   * @example
   * remove(1)
   */
  async remove(id: number) {
    return await this.prisma.vehicle.delete({
      where: { id },
    })
  }
}
