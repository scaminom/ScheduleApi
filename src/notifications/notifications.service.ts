import { Injectable } from '@nestjs/common'
import { CryptoService } from 'src/crypto/crypto.service'
import { FirebaseService } from 'src/firebase/firebase.service'
import { INotificationPayload } from './interfaces/i-notification-payload'

@Injectable()
export class NotificationsService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async sendPushNotification(payload: INotificationPayload) {
    try {
      const endpoint = await this.cryptoService.decryptString(payload.endpoint)

      await this.firebaseService.sendNotification({
        token: endpoint,
        notification: {
          title: payload.title,
          body: payload.body,
        },
        android: {
          priority: 'high',
          ttl: 1000 * 60 * 60 * 24,
        },
        apns: {
          headers: {
            'apns-priority': '5',
            'apns-expiration': String(1000 * 60 * 60 * 24),
          },
          payload: {
            aps: {
              category: 'TEST',
            },
          },
        },
        webpush: {
          headers: {
            Urgency: 'high',
            TTL: String(1000 * 60 * 60 * 24),
          },
        },
      })
    } catch (error) {
      return error
    }
  }
}
