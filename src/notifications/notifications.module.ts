import { Module } from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { CryptoModule } from 'src/crypto/crypto.module'

@Module({
  providers: [NotificationsService],
  exports: [NotificationsService],
  imports: [CryptoModule],
})
export class NotificationsModule {}
