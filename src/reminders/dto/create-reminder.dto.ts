import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsNumberString, IsDate } from 'class-validator'

export class CreateReminderDto {
  @ApiProperty({ example: 'Reminder title' })
  @IsString()
  title: string

  @ApiProperty({ example: 'Reminder description' })
  @IsString()
  description: string

  @ApiProperty({ example: '2021-08-01T00:00:00' })
  @IsDate()
  reminderDate: Date

  @ApiProperty({ example: 15 })
  @IsNumber()
  notificationMinutesBefore: number

  @ApiProperty({ example: '1' })
  @IsNumberString({ no_symbols: true }, { message: 'CI must be a number' })
  userCI: string
}
