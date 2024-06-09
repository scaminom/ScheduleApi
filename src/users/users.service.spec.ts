import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './users.service'
import { PrismaService } from '../prisma/prisma.service'
import { UserInvalidCIException } from './exceptions/user-invalid-ci'
import { UserAlreadyExistsException } from './exceptions/user-already-exits'
import { UserNotFoundException } from './exceptions/user-not-found'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from '@prisma/client'
import {
  createUserDtoFactory,
  createUserFactory,
  createUserUpdateDtoFactory,
} from './factories/user.factory'

describe('UserService', () => {
  let userService: UserService
  let prismaService: PrismaService

  beforeEach(async () => {
    prismaService = {
      user: {
        findUnique: jest.fn().mockResolvedValue({
          /* simple user object */
        }),
        create: jest.fn().mockResolvedValue({
          /* simple user object */
        }),
        update: jest.fn().mockResolvedValue({
          /* simple user object */
        }),
        // other methods
      },
      // other services
    } as unknown as PrismaService

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile()

    userService = module.get<UserService>(UserService)
  })

  describe('user', () => {
    it('should return a user when it exists', async () => {
      const userMock = createUserFactory()
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(userMock)

      const result = await userService.findOne(userMock.ci)

      expect(result).toEqual(userMock)
    })

    it('should return not found exception when user does not exist', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null)

      await expect(userService.findOne('1234567')).rejects.toThrow(
        UserNotFoundException,
      )
    })
  })

  describe('createUser', () => {
    it('should create a new user when the CI is valid and it does not exist', async () => {
      const createUserDto = createUserDtoFactory()
      const userMock: User = createUserFactory(createUserDto)
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null)

      jest.spyOn(prismaService.user, 'create').mockResolvedValue(userMock)

      const result = await userService.createUser(createUserDto)
      expect(result).toEqual(userMock)
    })

    it('should throw UserInvalidCIException when the CI is invalid', async () => {
      const createUserDto = createUserDtoFactory()
      createUserDto.ci = '1234567'
      await expect(userService.createUser(createUserDto)).rejects.toThrow(
        UserInvalidCIException,
      )
    })

    it('should throw UserAlreadyExistsException when the user already exists', async () => {
      const createUserDto = createUserDtoFactory()
      const userMock: User = createUserFactory(createUserDto)
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(userMock)

      await expect(userService.createUser(createUserDto)).rejects.toThrow(
        UserAlreadyExistsException,
      )
    })
  })

  describe('updateUser', () => {
    it('should update a user when it exists', async () => {
      const updateUserDto: UpdateUserDto = createUserUpdateDtoFactory()
      const userMock: User = createUserFactory()
      jest.spyOn(prismaService.user, 'update').mockResolvedValue(userMock)

      const result = await userService.updateUser({
        where: { ci: userMock.ci },
        data: updateUserDto,
      })

      expect(result).toEqual(userMock)
    })

    it('should throw UserNotFoundException when the user does not exist', async () => {
      const updateUserDto: UpdateUserDto = createUserUpdateDtoFactory()
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null)

      await expect(
        userService.updateUser({
          where: { ci: '1234567' },
          data: updateUserDto,
        }),
      ).rejects.toThrow(UserNotFoundException)
    })
  })

  describe('deleteUser', () => {
    it('should delete a user when it exists', async () => {
      const userMock: User = createUserFactory()
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(userMock)
      userMock.deletedAt = new Date()
      jest.spyOn(prismaService.user, 'update').mockResolvedValue(userMock)

      const result = await userService.deleteUser({ ci: userMock.ci })

      expect(result).toEqual(userMock)
    })

    it('should throw UserNotFoundException when the user does not exist', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null)

      await expect(userService.deleteUser({ ci: '1234567' })).rejects.toThrow(
        UserNotFoundException,
      )
    })
  })
})
