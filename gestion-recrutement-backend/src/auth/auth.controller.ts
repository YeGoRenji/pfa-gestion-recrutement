import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDto, AuthSignUpDto } from './dto';
import { UserObj } from './startegy';
import { User } from './decorator';
import { JwtGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthSignUpDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() dto: AuthSignInDto) {
    return this.authService.signin(dto);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Get('verify')
  verify(@User() user: UserObj) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      email: user.email,
    };
  }
}
