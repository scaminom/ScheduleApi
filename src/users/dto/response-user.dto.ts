import { User } from '@prisma/client'

export interface IResponseUser extends Omit<User, 'password'> {}
