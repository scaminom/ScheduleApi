import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common'

import { Request } from 'express'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { AuthService } from './auth.service'
import { Public } from './strategies/public.strategy'
import { SignInDto } from './dto/sign-in.dto'
import { ApiOperation, ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from './guards/auth.guard'
import { TokenResponse } from './dto/token-response.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({
    status: 200,
    description: 'The record found',
  })
  @ApiBody({ type: SignInDto })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.ci, signInDto.password)
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @ApiOperation({ summary: 'User Signup' })
  @ApiResponse({
    status: 200,
    description: 'The record found',
  })
  @ApiBody({ type: CreateUserDto })
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto)
  }

  @Public()
  @Get('logout')
  logout(@Req() request: Request): Promise<any> {
    return this.authService.logout(request)
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Validate Token' })
  @ApiResponse({
    status: 200,
    description: 'Schema with isValid and message, message is nullable',
    schema: {
      type: 'object',
      properties: {
        isValid: {
          type: 'boolean',
        },
        message: {
          type: 'string',
          nullable: true,
        },
      },
    },
  })
  @Get('validate-token')
  validateToken(@Req() request: Request): TokenResponse {
    return this.authService.validateToken(request)
  }
}
