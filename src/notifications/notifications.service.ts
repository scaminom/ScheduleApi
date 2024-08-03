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
          priority: 'normal',
          ttl: 1000 * 60 * 60 * 24,
          notification: {
            priority: 'max',
          },
        },
        apns: {
          headers: {
            'apns-priority': '5',
            'apns-expiration': String(
              Math.floor(Date.now() / 1000) + 60 * 60 * 24,
            ),
          },
          payload: {
            aps: {
              alert: {
                title: payload.title,
                body: payload.body,
              },
              sound: 'default',
              badge: 1,
              contentAvailable: true,
              category: 'TEST',
            },
          },
        },
        webpush: {
          headers: {
            Urgency: 'normal',
            TTL: String(1000 * 60 * 60 * 24),
          },
          notification: {
            title: payload.title,
            body: payload.body,
            requireInteraction: true,
          },
        },
      })
    } catch (error) {
      return error
    }
  }
}
