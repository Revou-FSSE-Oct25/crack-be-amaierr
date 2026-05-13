import { LevelTypes } from "generated/prisma/enums"

export class FilterCourseDto {
    title: string
    category: string
    level: LevelTypes
}