import { Module } from '@nestjs/common'
import { CryptoService } from './crypto.service'
import { ConfigModule } from '@nestjs/config'

@Module({
  providers: [CryptoService],
  exports: [CryptoService],
  imports: [ConfigModule],
})
export class CryptoModule {}
