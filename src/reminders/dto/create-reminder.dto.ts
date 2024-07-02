import { IsString, IsNumber } from 'class-validator'

export class CreateReminderDto {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsString()
  reminderDate: string | Date

  @IsNumber()
  notificationMinutesBefore: number

  @IsString()
  userId: string
}
