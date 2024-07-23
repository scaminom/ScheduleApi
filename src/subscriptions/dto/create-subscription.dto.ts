import { ApiProperty } from '@nestjs/swagger'
import { Role } from '@prisma/client'
import { IsEnum, IsObject, IsString } from 'class-validator'

export class CreateSubscriptionDto {
  @ApiProperty({ example: 'https://fcm.googleapis.com/fcm/send/123456' })
  @IsString()
  endpoint: string

  @ApiProperty({
    example: {
      p256dh: 'p256dh',
      auth: 'auth',
    },
  })
  @IsObject()
  keys: {
    p256dh: string
    auth: string
  }

  @ApiProperty({ example: Role.ADMIN })
  @IsEnum(Role)
  userRole: Role
}
