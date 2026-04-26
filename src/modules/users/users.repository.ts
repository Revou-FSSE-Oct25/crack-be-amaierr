import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { AuthUser } from "src/authorizations/dto/auth-user.dto";
import { RegisterDto } from "src/authorizations/dto/register.dto";
import { VARIABLE } from "src/constants/variable";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersRepository {
    constructor(private prisma: PrismaService) {}

    async findById(userId: string){
        return await this.prisma.user.findUnique({
            where: {id: userId},
            include: { role: true }
        })
    }

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

    async updateUser(user: AuthUser, updateUserDto: UpdateUserDto){
        return await this.prisma.user.update({
            where: {id: user.id},
            data: {
                name: updateUserDto.name,
                email: updateUserDto.email
            },
            select: {
                name: true,
                email: true
            }
        })
    }
}