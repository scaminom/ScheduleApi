import { Body, Controller, Get, Post } from '@nestjs/common'
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
}
