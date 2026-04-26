import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { AuthUser } from "src/authorizations/dto/auth-user.dto";

@Injectable()
export class CoursesRepository{
    constructor(private prisma: PrismaService) {}

    async createCourse(user: AuthUser, createCourseDto: CreateCourseDto){
        return await this.prisma.course.create({
            data: {
                name: createCourseDto.title,
                description: createCourseDto.description,
                levelType: createCourseDto.level,
                instructor: user.id,
                categoryId: createCourseDto.categoryId
            }
        })
    }
}