import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthorizationsService } from './authorizations.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorator/public.decorator';

@Controller('auth')
export class AuthorizationsController {
  constructor(private readonly authorizationsService: AuthorizationsService) {}

  @Public()
  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.authorizationsService.register(registerDto);
  }

  @Public()
  @Post('/login')
  login(@Body() loginDto: LoginDto){
    return this.authorizationsService.login(loginDto);
  }
}
