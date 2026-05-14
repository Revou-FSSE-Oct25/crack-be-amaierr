import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateSubCurriculumDto } from "./dto/create-sub-curriculum.dto";

@Injectable()
export class SubCurriculumRepository{
    constructor(private prisma: PrismaService) {}

    async findById(id: string){
        return await this.prisma.sub_curriculumn.findUnique({
            where: {id: id},
            select: {
                curriculumn: {
                    select: {
                        course: true
                    }
                }
            }
        })
    }

    async deleteSubCurriculum(id: string){
        return await this.prisma.sub_curriculumn.delete({
            where: {id: id}
        })
    }

    async getAllSubCurriculumByCourseId(courseId: string){
        return await this.prisma.sub_curriculumn.findMany({
            where: {
                curriculumn: {
                    courseId: courseId
                }
            },
            select: {
                id: true
            }
        })
    }

    async createSubCurriculum(createSubCurriculumDto: CreateSubCurriculumDto){
        return await this.prisma.sub_curriculumn.create({
            data: createSubCurriculumDto
        })
    }
}