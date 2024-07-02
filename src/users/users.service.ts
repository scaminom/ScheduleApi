import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { User, Prisma } from '@prisma/client'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserInvalidCIException } from './exceptions/user-invalid-ci'
import { UserAlreadyExistsException } from './exceptions/user-already-exits'
import { UserNotFoundException } from './exceptions/user-not-found'
import { validateCI } from './validators/user-validator'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    const { ci } = userWhereUniqueInput

    const user = await this.prisma.user.findUnique({
      where: {
        ci,
        deletedAt: null,
      },
    })

    return user
  }

  async findOne(ci: string): Promise<User | null> {
    const user = await this.user({ ci })

    if (!user) {
      throw new UserNotFoundException(ci)
    }

    return user
  }

  async users(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserWhereUniqueInput
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where: {
        ...where,
        deletedAt: null,
      },
      orderBy,
    })
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const { ci } = data

    if (!validateCI(ci)) {
      throw new UserInvalidCIException(ci)
    }

    const alreadyExists = await this.user({ ci })

    if (alreadyExists) {
      throw new UserAlreadyExistsException(ci)
    }

    return this.prisma.user.create({
      data,
    })
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput
    data: UpdateUserDto
  }): Promise<User> {
    const { ci } = params.where

    const notExists = await this.user({ ci })

    if (!notExists) {
      throw new UserNotFoundException(ci)
    }

    const { where, data } = params
    return this.prisma.user.update({
      data,
      where,
    })
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const { ci } = where

    const notExists = await this.user({ ci })

    if (!notExists) {
      throw new UserNotFoundException(ci)
    }
    return this.prisma.user.update({
      data: {
        deletedAt: new Date(),
      },
      where,
    })
  }
}
