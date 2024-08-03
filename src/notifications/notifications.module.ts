import { Module } from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { CryptoModule } from 'src/crypto/crypto.module'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module'

@Module({
  providers: [NotificationsService],
  exports: [NotificationsService],
  imports: [CryptoModule, FirebaseModule, SubscriptionsModule],
})
export class NotificationsModule {}
