import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUser } from 'src/authorizations/dto/auth-user.dto';
import { UsersRepository } from './users.repository';
import { ERROR_MESSAGES } from 'src/constants/error-messages';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository){}

  async updateUser(user: AuthUser, updateUserDto: UpdateUserDto) {
    const existingUser = await this.usersRepository.getUserByEmail(updateUserDto.email)

    if(existingUser){
      throw new ConflictException(ERROR_MESSAGES.USER.ALREADY_EXISTS)
    }

    return this.usersRepository.updateUser(user, updateUserDto)
  }
}
