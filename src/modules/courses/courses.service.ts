import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthUser } from 'src/authorizations/dto/auth-user.dto';
import { CoursesRepository } from './courses.repository';

@Injectable()
export class CoursesService {
  constructor(private readonly courseRepository: CoursesRepository){}

  createCourse(user: AuthUser, createCourseDto: CreateCourseDto) {
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
