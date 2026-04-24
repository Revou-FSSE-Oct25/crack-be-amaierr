import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { RegisterDto } from "src/authorizations/dto/register.dto";

@Injectable()
export class UsersRepository {
    constructor(private prisma: PrismaService) {}

    async getUserByEmail(email: string){
        return await this.prisma.users.findUnique({
            where: { email: email },
            select: {
                id: true,
                name: true,
                email: true, 
                password: true,
                roles: {
                    select: {
                        name: true
                    }
                }
            }
        });
    }

    async createNewUser(registerDto: RegisterDto, roleId: string){

        return await this.prisma.users.create({
            data: {
                email: registerDto.email,
                name: registerDto.name,
                password: registerDto.password,
                roleId: roleId
            }
        })
    }
}