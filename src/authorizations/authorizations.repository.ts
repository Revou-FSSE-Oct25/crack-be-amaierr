import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { AuthUser } from "./dto/auth-user.dto";

@Injectable()
export class AuthorizationsRepository {
    constructor(private prisma: PrismaService) {}

    
    async getMenuAuth(user: AuthUser){
        return await this.prisma.authorization.findMany({
            where: { roleId: (
                await this.prisma.role.findUniqueOrThrow({
                    where: { code: user.roleCode },
                    select: { id: true }
                })
            ).id },
            select: {
                menuIndex: true,
                menu: {
                    select: {
                        path: true,
                        label: true,
                        icon: true
                    }
                }
            },
            orderBy: { menuIndex: 'asc' }
        })
    }
}