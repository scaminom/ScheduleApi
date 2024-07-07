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

  /**
   * Find a user by its unique identifier
   * @param userWhereUniqueInput - The unique identifier of the user
   * @returns {Promise<User | null>} - The user or null if not found
   */
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

  /**
   * Find a user by its CI
   * @param ci - The CI of the user
   * @returns {Promise<User | null>} - The user or null if not found
   * @throws {UserNotFoundException} - If the user is not found
   */
  async findOne(ci: string): Promise<User | null> {
    const user = await this.user({ ci })

    if (!user) {
      throw new UserNotFoundException(ci)
    }

    return user
  }

  /**
   * Find all users
   * @param params - The parameters to filter the users
   * @returns {Promise<User[]>} - The users
   */
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

  /**
   * Create a new user
   * @param data - The data to create the user
   * @returns {Promise<User>} - The created user
   * @throws {UserInvalidCIException} - If the CI is invalid
   * @throws {UserAlreadyExistsException} - If the user already exists
   */
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

  /**
   * Update a user
   * @param params - The parameters to update the user
   * @returns {Promise<User>} - The updated user
   * @throws {UserNotFoundException} - If the user is not found
   */
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

  /**
   * Delete a user
   * @param where - The unique identifier of the user
   * @returns {Promise<User>} - The deleted user
   * @throws {UserNotFoundException} - If the user is not found
   */
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
