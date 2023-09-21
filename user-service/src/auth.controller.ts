import {
  Body,
  Controller,
  Logger,
  Post,
  Res,
  Request,
  UseGuards,
} from '@nestjs/common';
// files
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from './local-auth.guard';
import { Response } from 'express';

@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    this.logger.verbose(`signUp (${JSON.stringify(authCredentialsDto)})`);

    return this.authService.signUp(authCredentialsDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  signIn(@Request() req, @Res({ passthrough: true }) response?: Response) {
    const payload = {
      username: req.user.username,
      id: req.user.id,
    };
    const jwt = this.jwtService.sign(payload);
    response.cookie('jwt', jwt, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    const data = {
      username: req.user.username,
      user_id: req.user.id,
    };
    this.logger.verbose(`signin (${JSON.stringify(data)})`);
    return data;
  }
}
