import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import { UsersRepository } from 'src/modules/users/users.repository';
import { RolesRepository } from 'src/modules/roles/roles.repository';
import { VARIABLE } from 'src/constants/variable';
import { AuthUser } from './dto/auth-user.dto';
import { AuthorizationsRepository } from './authorizations.repository';

@Injectable()
export class AuthorizationsService {
  constructor(
      private readonly usersRepository: UsersRepository,
      private readonly authorizationsRepository: AuthorizationsRepository,
      private jwtService: JwtService
    ) {}

    async register(registerDto: RegisterDto){
      // Validate if user exist
      const existingUser = await this.usersRepository.getUserByEmail(registerDto.email)
      
      if(existingUser){
        throw new ConflictException(ERROR_MESSAGES.USER.ALREADY_EXISTS)
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(registerDto.password, 10)
      registerDto.password = hashedPassword

      return this.usersRepository.createNewUser(registerDto)
    }

    async login(loginDto: LoginDto){
      // Get existing user by email
      const user = await this.usersRepository.getUserByEmail(loginDto.email)
      if(!user){
        throw new NotFoundException(ERROR_MESSAGES.USER.NOT_FOUND)
      }
      
      // Validate password
      const isPasswordValid = await bcrypt.compare(loginDto.password, user.password)
      if(!isPasswordValid){
        throw new UnauthorizedException(ERROR_MESSAGES.AUTH.UNAUTHORIZED)
      }

      // Return token
      const payload = {id: user.id, name: user.name, email: user.email, roleCode: user.role.code, roleName: user.role.name}
      return {
        access_token: this.jwtService.sign(payload)
      };
    }

    async getMenuAuth(user: AuthUser){
      return this.authorizationsRepository.getMenuAuth(user)
    }
}
