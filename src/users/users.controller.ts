import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { UserService } from './users.service'
import { UsersModule } from './users.module'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UsersModule[]> {
    return this.usersService.users({})
  }

  @Post()
  @ApiBody({
    type: CreateUserDto,
    description: 'The user to create',
    required: true,
  })
  async signupUser(
    @Body()
    userData: CreateUserDto,
  ): Promise<UsersModule> {
    return this.usersService.createUser(userData)
  }

  @Get('/:ci')
  @ApiParam({
    name: 'ci',
    description: 'The CI of the user',
    example: '0202020202',
    required: true,
  })
  async getUser(@Param('ci') ci: string): Promise<UsersModule> {
    return this.usersService.findOne(ci)
  }
}
