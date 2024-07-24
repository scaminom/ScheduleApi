import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto'
import { IEnvConfig } from 'src/config/config'

@Injectable()
export class CryptoService {
  private readonly algorithm
  private readonly securityKey

  constructor(private readonly config: ConfigService) {
    this.algorithm = this.config.get<IEnvConfig>('config').CRYPTO_ALGORITHM
    this.securityKey = this.config.get<IEnvConfig>('config').CRYPTO_SECRET
  }

  async encryptString(text: string) {
    const initVector = randomBytes(16)
    const cipher = createCipheriv(this.algorithm, this.securityKey, initVector)

    let encrypted = cipher.update(text, 'utf8', 'hex')

    encrypted += cipher.final('hex')

    return encrypted
  }

  async decryptString(text: string) {
    const initVector = randomBytes(16)
    const decipher = createDecipheriv(
      this.algorithm,
      this.securityKey,
      initVector,
    )

    let decrypted = decipher.update(text, 'hex', 'utf8')

    decrypted += decipher.final('utf8')

    return decrypted
  }
}
