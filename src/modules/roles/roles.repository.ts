import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class RolesRepository {
    constructor(private prisma: PrismaService) {}

    async getRoleIdByCode(code: string){
        return this.prisma.roles.findUnique({
            where: { code: code },
            select: { id: true }
        })
    }
}