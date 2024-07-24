import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma, Role, User } from '@prisma/client'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserInvalidCIException } from './exceptions/user-invalid-ci'
import { UserAlreadyExistsException } from './exceptions/user-already-exits'
import { UserNotFoundException } from './exceptions/user-not-found'
import { validateCI } from './validators/user-validator'
import { genSalt, hash } from 'bcrypt'
import { IResponseUser } from './dto/response-user.dto'
import { UserCantAssignColorException } from './exceptions/user-cant-assign-color'
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service'

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly subscriptionService: SubscriptionsService,
  ) {}

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
   * @returns {Promise<IResponseUser | null>} - The user or null if not found
   * @throws {UserNotFoundException} - If the user is not found
   */
  async findOne(ci: string): Promise<IResponseUser | null> {
    const user = await this.user({ ci })

    if (!user) {
      throw new UserNotFoundException(ci)
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user

    return result
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
  }): Promise<IResponseUser[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where: {
        ...where,
        deletedAt: null,
      },
      select: {
        ci: true,
        color: true,
        firstName: true,
        lastName: true,
        role: true,
        deletedAt: true,
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
   * @throws {UserCantAssignColorException} - If the user can't assign a color
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

    if (data.role !== Role.MECHANIC && data.color != null) {
      throw new UserCantAssignColorException()
    }

    const hashedPassword = await this.generateSaltPassword(data.password)

    data.password = hashedPassword
    return this.prisma.user.create({
      data,
    })
  }

  /**
   * Generate a salted password
   * @param password - The password to hash
   * @returns {Promise<string>} - The hashed password
   */
  async generateSaltPassword(password: string): Promise<string> {
    const ROUNDS = 10
    const SALT = await genSalt(ROUNDS)

    return hash(password, SALT)
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

    if (params.data.role !== Role.MECHANIC && params.data.color != null) {
      throw new UserCantAssignColorException()
    }

    if (params.data.password) {
      const pa = await this.generateSaltPassword(params.data.password)

      Object.assign(params.data, { password: pa })
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

    this.subscriptionService.disableSubscriptionsByUser(ci)

    return this.prisma.user.update({
      data: {
        deletedAt: new Date(),
      },
      where,
    })
  }
}
