import { Inject, Injectable, Logger } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { FIREBASE_PROVIDER } from './constans'
import { Message } from 'firebase-admin/lib/messaging/messaging-api'
import { BaseConflictException } from 'src/shared/exceptions/conflict'

@Injectable()
export class FirebaseService {
  private readonly logger: Logger = new Logger(FirebaseService.name)

  constructor(
    @Inject(FIREBASE_PROVIDER)
    private readonly firebaseApp: admin.app.App,
  ) {}

  async sendNotification(payload: Message) {
    try {
      await this.firebaseApp.messaging().send(payload)
    } catch (error) {
      console.error(error)
      this.logger.error(error)
      throw new BaseConflictException(
        'Servicio de notificaciones no disponible',
      )
    }
  }
}
