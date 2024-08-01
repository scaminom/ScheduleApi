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
    const endpoint = await this.cryptoService.decryptString(payload.endpoint)

    await this.firebaseService.sendNotification({
      token: endpoint,
      notification: {
        title: payload.title,
        body: payload.body,
      },
      webpush: payload.link && {
        headers: {
          TTL: '60',
        },
        notification: {
          vibrate: [200, 100, 200],
          icon: 'https://avatars.githubusercontent.com/u/56169832?s=200&v=4',
        },
        fcmOptions: {
          link: payload.link,
        },
      },
    })
  }
}
