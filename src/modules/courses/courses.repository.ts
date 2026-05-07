import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { AuthUser } from "src/authorizations/dto/auth-user.dto";

@Injectable()
export class CoursesRepository{
    constructor(private prisma: PrismaService) {}

    async findById(courseId: string){
        return await this.prisma.course.findUnique({
            where: { id: courseId }
        })
    }

    async createCourse(user: AuthUser, createCourseDto: CreateCourseDto){
        return await this.prisma.course.create({
            data: {
                name: createCourseDto.title,
                description: createCourseDto.description,
                levelType: createCourseDto.level,
                instructorId: user.id,
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
            },
            select: {
                id: true,
                name: true,
                description: true,
                levelType: true,
                rating: true,
                students: true,
                instructor: {
                    select: {
                        name: true
                    }
                }
            }
        })
    }
    
    async getEnrolledCourses(userId: string){
        return await this.prisma.course.findMany({
            where: {
                enrollments: {
                    some: {
                        userId: userId
                    }
                }
            },
            select: {
                name: true,
                description: true,
                levelType: true,
                rating: true,
                students: true,
                instructor: {
                    select: {
                        name: true
                    }
                },
                enrollments: {
                    select: {
                        progressPercentage: true
                    }
                }
            }
        })
    }

    async getCourseByInstructorId(instructorId: string){
        return await this.prisma.course.findMany({
            where: { instructorId: instructorId },
            select: {
                name: true,
                description: true,
                levelType: true,
                rating: true,
                students: true,
                instructor: {
                    select: {
                        name: true
                    }
                }
            }
        })
    }
}