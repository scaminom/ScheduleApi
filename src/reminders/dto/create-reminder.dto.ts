import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsString, IsNumber, IsNumberString, IsDate } from 'class-validator'

export class CreateReminderDto {
  @ApiProperty({ example: 'Reminder title' })
  @IsString()
  title: string

  @ApiProperty({ example: 'Reminder description' })
  @IsString()
  description: string

  @ApiProperty({ example: '#FFFFFF' })
  @IsString()
  color: string

  // gmt
  @ApiProperty({ example: '2024-07-22 01:14:00-05' })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  reminderDate: Date

  @ApiProperty({ example: 15, description: 'Minutes before the reminder' })
  @IsNumber()
  notificationMinutesBefore: number

  @ApiProperty({ example: '0202020202' })
  @IsNumberString({ no_symbols: true }, { message: 'CI must be a number' })
  userCI: string
}
