import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    CONTAINER_NAME: process.env.CONTAINER_NAME,
    DATABASE_URL: process.env.DATABASE_URL,
  };
});
