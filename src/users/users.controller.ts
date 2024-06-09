import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { UserService } from './users.service'
import { UsersModule } from './users.module'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UsersModule[]> {
    return this.usersService.users({})
  }

  @Post()
  async signupUser(@Body() userData: CreateUserDto): Promise<UsersModule> {
    return this.usersService.createUser(userData)
  }

  @Get('/:ci')
  async getUser(@Param('ci') ci: string): Promise<UsersModule> {
    return this.usersService.findOne(ci)
  }
}
