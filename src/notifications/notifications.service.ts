import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as webpush from 'web-push'
import { IEnvConfig } from '../config/config'
import { CryptoService } from 'src/crypto/crypto.service'

@Injectable()
export class NotificationsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly cryptoService: CryptoService,
  ) {
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
      const endpoint = await this.cryptoService.decryptString(
        subscription.endpoint,
      )
      await webpush.sendNotification(
        { ...subscription, endpoint },
        JSON.stringify(data),
      )
      Logger.log('Push notification sent successfully')
    } catch (error) {
      Logger.error('Error sending push notification', error)
    }
  }
}
