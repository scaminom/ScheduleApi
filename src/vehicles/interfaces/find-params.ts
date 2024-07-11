import { Prisma } from '@prisma/client'

export interface IFindParams {
  skip?: number
  take?: number
  cursor?: Prisma.VehicleWhereUniqueInput
  where?: Prisma.VehicleWhereInput
  orderBy?: Prisma.VehicleOrderByWithRelationInput
}
