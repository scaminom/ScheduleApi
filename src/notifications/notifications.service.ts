import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as webpush from 'web-push'
import { IEnvConfig } from '../config/config'

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {
    webpush.setVapidDetails(
      this.configService.get<IEnvConfig>('config').VAPID_SUBJECT,
      this.configService.get<IEnvConfig>('config').VAPID_PUBLIC_KEY,
      this.configService.get<IEnvConfig>('config').VAPID_PRIVATE_KEY,
    )
  }

  async sendPushNotification(
    subscription: webpush.PushSubscription,
    data: any,
  ) {
    try {
      await webpush.sendNotification(subscription, JSON.stringify(data))
      Logger.log('Push notification sent successfully')
    } catch (error) {
      Logger.error('Error sending push notification', error)
    }
  }
}
