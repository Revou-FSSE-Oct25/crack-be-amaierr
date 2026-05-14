import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateCourseProgressDto } from "./dto/create-progress.dto";

@Injectable()
export class ProgressesRepository {
    constructor(private prisma: PrismaService) {}

    async createNewCourseProgresses(progressesData: CreateCourseProgressDto[]){
        return await this.prisma.progress.createMany({
            data: progressesData,
            skipDuplicates: true,
        })
    }
}