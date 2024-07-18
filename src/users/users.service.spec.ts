import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './users.service'
import { PrismaService } from '../prisma/prisma.service'
import { UserInvalidCIException } from './exceptions/user-invalid-ci'
import { UserAlreadyExistsException } from './exceptions/user-already-exits'
import { UserNotFoundException } from './exceptions/user-not-found'
import { UpdateUserDto } from './dto/update-user.dto'
import { Role, User } from '@prisma/client'
import { generateValidCI, UserFactory } from './factories/user.factory'
import { UserCantAssignColorException } from './exceptions/user-cant-assign-color'

const prismaMock = {
  user: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
}

describe('UserService', () => {
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile()

    userService = module.get<UserService>(UserService)
  })

  it('should return a user when it exists', async () => {
    const userMock = await UserFactory.create({ ci: generateValidCI() })
    jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValue(userMock)

    const result = await userService.findOne(userMock.ci)

    expect(result).toEqual({ ...userMock, password: undefined })
  })

  it('should return not found exception when user does not exist', async () => {
    jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValue(null)

    await expect(userService.findOne('1234567')).rejects.toThrow(
      UserNotFoundException,
    )
  })

  it('should create a new user when the CI is valid and it does not exist', async () => {
    const createUserDto = await UserFactory.buildCreateInput({
      ci: generateValidCI(),
      color: undefined,
    })
    const userMock: User = await UserFactory.create(createUserDto)
    jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValue(null)

    jest.spyOn(prismaMock.user, 'create').mockResolvedValue(userMock)

    const result = await userService.createUser(createUserDto)
    expect(result).toEqual(userMock)
  })

  it('should throw UserInvalidCIException when the CI is invalid', async () => {
    const createUserDto = await UserFactory.buildCreateInput()
    await expect(userService.createUser(createUserDto)).rejects.toThrow(
      UserInvalidCIException,
    )
  })

  it('should throw UserAlreadyExistsException when the user already exists', async () => {
    const createUserDto = await UserFactory.buildCreateInput({
      ci: generateValidCI(),
    })

    const userMock: User = await UserFactory.create(createUserDto)

    jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValue(userMock)

    await expect(userService.createUser(createUserDto)).rejects.toThrow(
      UserAlreadyExistsException,
    )
  })

  it('should throw UserCantAssignColorException when the user can not assign a color', async () => {
    const createUserDto = await UserFactory.buildCreateInput({
      ci: generateValidCI(),
      color: 'red',
      role: Role.ADMIN,
    })

    jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValue(null)

    await expect(userService.createUser(createUserDto)).rejects.toThrow(
      UserCantAssignColorException,
    )
  })

  it('should update a user when it exists', async () => {
    const userMock: User = await UserFactory.create()
    const updateUserDto: UpdateUserDto = await UserFactory.buildCreateInput({
      firstName: 'New Name',
    })

    jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValue(userMock)

    userMock.firstName = updateUserDto.firstName

    jest.spyOn(prismaMock.user, 'update').mockResolvedValue(userMock)

    const result = await userService.updateUser({
      where: { ci: userMock.ci },
      data: updateUserDto,
    })

    expect(result).toEqual(userMock)
  })

  it('should throw UserNotFoundException when the user does not exist', async () => {
    const updateUserDto: UpdateUserDto = await UserFactory.buildCreateInput({
      ci: '1234567',
      password: 'newpassword',
    })
    jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValue(null)

    await expect(
      userService.updateUser({
        where: { ci: '1234567' },
        data: updateUserDto,
      }),
    ).rejects.toThrow(UserNotFoundException)
  })

  it('should delete a user when it exists', async () => {
    const userMock: User = await UserFactory.create()
    jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValue(userMock)
    userMock.deletedAt = new Date()
    jest.spyOn(prismaMock.user, 'update').mockResolvedValue(userMock)

    const result = await userService.deleteUser({ ci: userMock.ci })

    expect(result).toEqual(userMock)
  })

  it('should throw UserNotFoundException when the user does not exist', async () => {
    jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValue(null)

    await expect(userService.deleteUser({ ci: '1234567' })).rejects.toThrow(
      UserNotFoundException,
    )
  })
})
