import { IsNotEmpty, IsString } from "class-validator"
import { LevelTypes } from "generated/prisma/enums"

export class CreateCourseDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsString()
    categoryId: string
    
    @IsString()
    level: LevelTypes
}
