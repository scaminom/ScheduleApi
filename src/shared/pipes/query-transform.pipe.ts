import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { AppointmentFiltersDto } from 'src/appointments/dto/appointment-filters.dto'

@Injectable()
export class QueryTransformPipe implements PipeTransform {
  async transform(
    value: AppointmentFiltersDto,
    { metatype }: ArgumentMetadata,
  ) {
    if (!metatype) {
      return value
    }

    return plainToInstance(metatype, value)
  }
}
