import { Module } from '@nestjs/common'
import { VehiclesService } from './vehicles.service'
import { VehiclesController } from './vehicles.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [VehiclesController],
  imports: [PrismaModule],
  providers: [VehiclesService],
})
export class VehiclesModule {}
