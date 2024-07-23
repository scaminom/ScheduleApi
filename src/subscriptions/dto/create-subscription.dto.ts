import { ApiProperty } from '@nestjs/swagger'
import { Role } from '@prisma/client'
import { IsEnum, IsObject } from 'class-validator'

export class CreateSubscriptionDto {
  @ApiProperty({
    example: {
      endpoint: 'https://fcm.googleapis.com/fcm/send/fj4j3j4',
      keys: {
        p256dh: 'BGFJH',
        auth: 'FJHJF',
      },
    },
  })
  @IsObject()
  subscription: {
    endpoint: string
    keys: {
      p256dh: string
      auth: string
    }
    expirationTime?: number
  }

  @ApiProperty({ example: Role.ADMIN })
  @IsEnum(Role)
  userRole: Role
}
