import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createCipheriv, createDecipheriv, getCiphers } from 'crypto'
import { IEnvConfig } from 'src/config/config'

@Injectable()
export class CryptoService {
  private readonly algorithm: string
  private readonly securityKey: Buffer
  private readonly ivKey: Buffer

  constructor(private readonly config: ConfigService) {
    this.algorithm = this.config.get<IEnvConfig>('config').CRYPTO_ALGORITHM
    const key = this.config.get<IEnvConfig>('config').CRYPTO_SECRET
    this.securityKey = Buffer.from(key)
    this.ivKey = Buffer.from(this.config.get<IEnvConfig>('config').CRYPTO_KEY)

    console.log(this.algorithm, console.log(getCiphers()))
  }

  async encryptString(text: string): Promise<string> {
    const cipher = createCipheriv(this.algorithm, this.securityKey, this.ivKey)

    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    return encrypted
  }

  async decryptString(encrypted: string): Promise<string> {
    const decipher = createDecipheriv(
      this.algorithm,
      this.securityKey,
      this.ivKey,
    )

    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
  }
}
