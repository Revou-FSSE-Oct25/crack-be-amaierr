import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class RolesRepository {
    constructor(private prisma: PrismaService) {}

    async findById(roleId: string){
        return this.prisma.role.findUnique({
            where: { id: roleId }
        })
    }
}