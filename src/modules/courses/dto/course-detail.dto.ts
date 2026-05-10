import { Prisma } from "generated/prisma/client"

export class CourseDetailDto {
    name: string
    description: string
    rating: Prisma.Decimal
    students: number
    levelType: string
    instructor: {name: string}
    curriculumns: {
        name: string
        subCurriculums: {
            name: string
            materialLink: string
        }[]
    }[]
    reviews: {
        rating: string | null
        user: {name: string}
        comment: string | null
    }[]


    constructor(partial: Partial<CourseDetailDto>) {
        Object.assign(this, partial);
      }
}