import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { RegisterDto } from "src/authorizations/dto/register.dto";
import { VARIABLE } from "src/constants/variable";

@Injectable()
export class UsersRepository {
    constructor(private prisma: PrismaService) {}

    async getUserByEmail(email: string){
        return await this.prisma.user.findUnique({
            where: { email: email },
            select: {
                id: true,
                name: true,
                email: true, 
                password: true,
                role: {
                    select: {
                        code: true,
                        name: true
                    }
                }
            }
        });
    }

    async createNewUser(registerDto: RegisterDto){
        return await this.prisma.user.create({
            data: {
                email: registerDto.email,
                name: registerDto.name,
                password: registerDto.password,
                role: {
                    connect: { code: VARIABLE.ROLES.STUDENT }
                }
            },
            select: {
                name: true,
                email: true,
                role: {
                    select: {
                        name: true
                    }
                }
            }
        })
    }
}