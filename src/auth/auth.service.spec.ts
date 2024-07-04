import { JwtService } from '@nestjs/jwt'
import { TestingModule, Test } from '@nestjs/testing'
import { UserService } from '../users/users.service'
import { AuthService } from './auth.service'
import { HttpStatus, UnauthorizedException } from '@nestjs/common'
import { UserFactory } from '../users/factories/user.factory'

describe('AuthService', () => {
  let authService: AuthService
  let userService: UserService
  let jwtService: JwtService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            user: jest.fn(),
            createUser: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile()

    authService = module.get<AuthService>(AuthService)
    userService = module.get<UserService>(UserService)
    jwtService = module.get<JwtService>(JwtService)
  })

  it('should return a valid token for correct credentials', async () => {
    const userMock = await UserFactory.create()

    jest.spyOn(userService, 'user').mockResolvedValue(userMock)
    jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token')

    const result = await authService.signIn(userMock.ci, userMock.password)
    expect(result.access_token).toEqual('token')
  })

  it('should throw UnauthorizedException for wrong credentials', async () => {
    jest.spyOn(userService, 'user').mockResolvedValue(null)

    await expect(authService.signIn('123', 'wrongpass')).rejects.toThrow(
      UnauthorizedException,
    )
  })

  it('should successfully create a new user', async () => {
    const createUser = await UserFactory.create()
    jest.spyOn(userService, 'createUser').mockResolvedValue(createUser)

    const result = await authService.signUp(createUser)
    expect(result).toEqual(createUser)
  })

  it('should logout user', async () => {
    const req = { user: { ci: '123' } } as any
    const result = await authService.logout(req)
    expect(req.user).toBeNull()
    expect(result).toEqual({
      message: 'Logout successful',
      statusCode: HttpStatus.OK,
    })
  })
})
