import { Module } from '@nestjs/common'
import { JobsService } from './jobs.service'
import { JobsController } from './jobs.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { InspectionsModule } from 'src/inspections/inspections.module'
import { JobsGateway } from './jobs.gateway';

@Module({
  controllers: [JobsController],
  imports: [PrismaModule, InspectionsModule],
  providers: [JobsService, JobsGateway],
})
export class JobsModule {}
