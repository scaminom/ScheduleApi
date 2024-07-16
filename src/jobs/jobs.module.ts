import { Module } from '@nestjs/common'
import { JobsService } from './jobs.service'
import { JobsController } from './jobs.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { InspectionsModule } from 'src/inspections/inspections.module'

@Module({
  controllers: [JobsController],
  imports: [PrismaModule, InspectionsModule],
  providers: [JobsService],
})
export class JobsModule {}
