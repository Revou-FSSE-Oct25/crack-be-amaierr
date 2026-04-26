import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthUser } from "../dto/auth-user.dto";
import { UsersRepository } from "src/modules/users/users.repository";
import { ERROR_MESSAGES } from "src/constants/error-messages";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private configService: ConfigService,
        private userRepository: UsersRepository
        ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET')!
        })
    }

    async validate(payload: AuthUser){
        const user = await this.userRepository.findById(payload.id)

        if(!user){
            throw new NotFoundException(ERROR_MESSAGES.USER.NOT_FOUND)
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            roleCode: user.role.code,
            roleName: user.role.name
        }
    }
}