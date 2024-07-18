import { Controller, Get, Param } from '@nestjs/common'
import { UserService } from './users.service'
import { UsersModule } from './users.module'
import { ApiParam, ApiTags } from '@nestjs/swagger'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UsersModule[]> {
    return this.usersService.users({})
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
