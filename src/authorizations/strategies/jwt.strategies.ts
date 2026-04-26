import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthUser } from "../dto/auth-user.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private configService: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET')!
        })
    }

    async validate(payload: AuthUser){
        return {
            id: payload.id,
            name: payload.name,
            email: payload.email,
            roleCode: payload.roleCode,
            roleName: payload.roleName
        }
    }
}