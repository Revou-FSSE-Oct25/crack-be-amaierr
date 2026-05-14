import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { AuthUser } from "src/authorizations/dto/auth-user.dto";

@Injectable()
export class CurriculumRepository {
    constructor(private prisma: PrismaService) {}

    async findById(curriculumId: string){
        return await this.prisma.curriculumn.findUnique({
            where: {id: curriculumId},
            select: {
                course: true
            }
        })
    }
}