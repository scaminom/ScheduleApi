import { Prisma } from '@prisma/client'
import {
  IsString,
  IsNumber,
  IsDateString,
  IsNumberString,
} from 'class-validator'

export class CreateReminderDto implements Prisma.ReminderCreateInput {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsDateString()
  reminderDate: string | Date

  @IsNumber()
  notificationMinutesBefore: number

  @IsNumberString({ no_symbols: true }, { message: 'CI must be a number' })
  userCI: string
}
