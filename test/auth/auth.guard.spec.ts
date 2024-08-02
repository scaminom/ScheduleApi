import { ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { TestingModule, Test } from '@nestjs/testing'
import { AuthGuard } from '../../src/auth/guards/auth.guard'

describe('AuthGuard', () => {
  let authGuard: AuthGuard
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let jwtService: JwtService
  let reflector: Reflector

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: { verifyAsync: jest.fn() },
        },
        {
          provide: Reflector,
          useValue: { getAllAndOverride: jest.fn() },
        },
      ],
    }).compile()

    authGuard = module.get<AuthGuard>(AuthGuard)
    jwtService = module.get<JwtService>(JwtService)
    reflector = module.get<Reflector>(Reflector)
  })

  it('should allow access for public routes', async () => {
    const contex = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          headers: {},
        }),
      }),
    } as unknown as ExecutionContext
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true)
    expect(await authGuard.canActivate(contex)).toBe(true)
  })
})
