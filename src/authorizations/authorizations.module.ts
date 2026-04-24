import { Module } from '@nestjs/common';
import { AuthorizationsService } from './authorizations.service';
import { AuthorizationsController } from './authorizations.controller';
import { UsersRepository } from 'src/modules/users/users.repository';
import { RolesRepository } from 'src/modules/roles/roles.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategies';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { 
          expiresIn: config.get<string>('JWT_EXPIRATION') as any
        }
      })
    })
  ],
  controllers: [AuthorizationsController],
  providers: [AuthorizationsService, UsersRepository, RolesRepository, JwtStrategy],
})
export class AuthorizationsModule {}
