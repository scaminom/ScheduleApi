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
      return await this.firebaseApp.messaging().send(payload)
    } catch (error) {
      if (
        error.code === 'messaging/invalid-argument' ||
        error.code === 'messaging/registration-token-not-registered' ||
        error.code === 'messaging/invalid-registration-token' ||
        error.code?.name == 'INVALID_ARGUMENT' ||
        error.code?.name == 'NOT_FOUND' ||
        error.messagingErrorCode?.name == 'UNREGISTERED'
      ) {
        throw new BaseConflictException('Token de notificación inválido', error)
      }

      this.logger.error('Error al enviar notificación', error)
      throw new BaseConflictException(
        'Servicio de notificaciones no disponible',
        error,
      )
    }
  }
}
