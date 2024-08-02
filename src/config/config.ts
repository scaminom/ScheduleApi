import { registerAs } from '@nestjs/config'

export interface IEnvConfig {
  DB_PASSWORD: string
  DB_NAME: string
  DB_HOST: string
  DB_PORT: number
  DB_USERNAME: string
  CONTAINER_NAME: string
  DATABASE_URL: string
  JWT_SECRET: string
  JWT_EXPIRATION: string
  VAPID_PUBLIC_KEY: string
  VAPID_PRIVATE_KEY: string
  VAPID_SUBJECT: string
  CRYPTO_SECRET: string
  CRYPTO_ALGORITHM: string
  CRYPTO_KEY: string
}

export default registerAs('config', () => {
  return {
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    CONTAINER_NAME: process.env.CONTAINER_NAME,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION,
    VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY,
    VAPID_SUBJECT: process.env.VAPID_SUBJECT,
    CRYPTO_SECRET: process.env.CRYPTO_SECRET,
    CRYPTO_ALGORITHM: process.env.CRYPTO_ALGORITHM,
    CRYPTO_KEY: process.env.CRYPTO_KEY,
  }
})
