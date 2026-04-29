import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { AuthUser } from "src/authorizations/dto/auth-user.dto";

@Injectable()
export class EnrollmentsRepository {
    constructor(private prisma: PrismaService) {}

    async findEnrollmentByUserIdAndCourseId(userId: string, courseId: string){
        return await this.prisma.enrollment.findFirst({
            where: {
                userId: userId,
                courseId: courseId
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
                        instructor: {
                            select: {
                                name: true,
                                email: true
                            }
                        }
                    }
                },
                progressPercentage: true
            }
        })
    }
}