import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthUser } from 'src/authorizations/dto/auth-user.dto';
import { CoursesRepository } from './courses.repository';
import { LevelTypes } from 'generated/prisma/enums';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import { CategoriesRepository } from '../categories/categories.repository';

@Injectable()
export class CoursesService {
  constructor(
    private readonly courseRepository: CoursesRepository,
    private readonly categoriesRepository: CategoriesRepository
  ){}

  async createCourse(user: AuthUser, createCourseDto: CreateCourseDto) {
    const courseData = await this.categoriesRepository.findById(createCourseDto.categoryId)

    if(!courseData){
      throw new NotFoundException(ERROR_MESSAGES.CATEGORY.NOT_EXIST)
    }

    const levels = LevelTypes
    if(!Object.values(levels).includes(createCourseDto.level)){
      throw new NotAcceptableException(ERROR_MESSAGES.COURSE.LEVEL_NOT_VALID)
    }
    return this.courseRepository.createCourse(user, createCourseDto)
  }

  getUnenrolledCourses(user: AuthUser) {
    return `This action returns all courses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
