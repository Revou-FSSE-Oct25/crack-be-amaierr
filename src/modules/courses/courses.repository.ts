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

    async getUnenrolledCourses(user: AuthUser){
        return await this.prisma.course.findMany({
            where: {
                enrollments: {
                    none: {
                        userId: user.id
                    }
                }
            }
        })
    }

    async enrollCourse(user: AuthUser, courseId: string){
        return await this.prisma.enrollment.create({
            data: {
                userId: user.id,
                courseId: courseId,
                progressPercentage: 0
            },
            select: {
                course: {
                    select: {
                        name: true,
                        levelType: true,
                        instructor: true
                    }
                },
                progressPercentage: true
            }
        })
    }
}