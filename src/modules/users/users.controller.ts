import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/authorizations/decorator/user.decorator';
import { AuthUser } from 'src/authorizations/dto/auth-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getDetails(@User() user: AuthUser) {
    return {name: user.name, email: user.email, role: user.roleName};
  }

  @Patch()
  updateUser(@User() user: AuthUser, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(user, updateUserDto);
  }
}
