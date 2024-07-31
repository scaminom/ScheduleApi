import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsObject } from 'class-validator'
import { ISubscriptionPayload } from '../interfaces/i-subscription-payload'

export class CreateSubscriptionDto {
  @ApiProperty({
    example: {
      endpoint: 'https://fcm.googleapis.com/fcm/send/fj4j3j4',
    },
  })
  @IsObject()
  subscription: ISubscriptionPayload

  @ApiProperty({ example: '0202020202' })
  @IsNumberString()
  userCI: string
}
