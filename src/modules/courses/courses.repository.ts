import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { AuthUser } from "src/authorizations/dto/auth-user.dto";
import { FilterCourseDto } from "./dto/course-filter.dto";

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

    async getUnenrolledCourses(user: AuthUser, filter: FilterCourseDto){
        const { category, level, title } = filter;

        return await this.prisma.course.findMany({
            where: {
                enrollments: {
                    none: {
                        userId: user.id
                    }
                },
                ...(category? {categoryId : category} : {}),
                ...(level? {levelType : level} : {}),
                ...(title? {name : { contains: title, mode: 'insensitive' }} : {}),
            },
            select: {
                id: true,
                name: true,
                description: true,
                levelType: true,
                duration: true,
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
    
    async getEnrolledCourses(userId: string, filter: FilterCourseDto){
        const { category, level, title } = filter;

        return await this.prisma.course.findMany({
            where: {
                enrollments: {
                    some: {
                        userId: userId
                    }
                },
                ...(category? {categoryId : category} : {}),
                ...(level? {levelType : level} : {}),
                ...(title? {name : { contains: title, mode: 'insensitive' }} : {}),
            },
            select: {
                id: true,
                name: true,
                description: true,
                levelType: true,
                duration: true,
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

    async getCourseByInstructorId(instructorId: string, filter: FilterCourseDto){
        const { category, level, title } = filter;

        return await this.prisma.course.findMany({
            where: { 
                instructorId: instructorId,
                ...(category? {categoryId : category} : {}),
                ...(level? {levelType : level} : {}),
                ...(title? {name : { contains: title, mode: 'insensitive' }} : {}),
            },
            select: {
                id: true, 
                name: true,
                description: true,
                levelType: true,
                duration: true,
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

    async getCourseDetail(user: AuthUser, courseId: string){
        return await this.prisma.course.findUnique({
            where: {id: courseId},
            select: {
                name: true,
                description: true,
                duration: true,
                rating: true,
                students: true,
                levelType: true,
                instructor: {
                    select: {
                        name: true
                    }
                },
                enrollments: {
                    where: {userId: user.id},
                    select: {
                        progressPercentage: true
                    }
                },
                curriculumns:{
                    select:{
                        id: true,
                        name: true,
                        subCurriculums: {
                            select: {
                                id: true,
                                name: true,
                                duration: true,
                                materialLink: true,
                                progresses: {
                                    where: {
                                        userId: user.id
                                    },
                                    select: {
                                        isDone: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    }
}