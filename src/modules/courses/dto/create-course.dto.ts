import { LevelTypes } from "generated/prisma/enums"

export class CreateCourseDto {
    title: string
    description: string
    categoryId: string
    level: LevelTypes
}
