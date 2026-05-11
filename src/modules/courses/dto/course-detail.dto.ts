import { Prisma } from "generated/prisma/client"

export class CourseDetailDto {
    name: string
    description: string
    duration: number
    rating: Prisma.Decimal
    students: number
    levelType: string
    instructor: {name: string}
    enrollments: {
        progressPercentage: number
    }[]
    curriculumns: {
        id:string
        name: string
        subCurriculums: {
            id:string
            name: string
            duration: number
            materialLink: string
            progresses: {
                isDone: boolean | null
            }[]
        }[]
    }[]
    reviews: {
        rating: number | null
        user: {name: string}
        comment: string | null
    }[]


    constructor(partial: Partial<CourseDetailDto>) {
        Object.assign(this, partial);
      }
}