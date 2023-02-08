import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() userObject: RegisterAuthDto, @Res() res) {
    const data = await this.authService.register(userObject);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      data: data,
    });
  }

  @Post('login')
  async loginUser(@Body() userObjectLogin: LoginAuthDto, @Res() res) {
    const data = await this.authService.login(userObjectLogin);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      data: data,
    });
  }
}


