import { ConflictException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { AuthUser } from 'src/authorizations/dto/auth-user.dto';
import { CoursesRepository } from './courses.repository';
import { LevelTypes } from 'generated/prisma/enums';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import { CategoriesRepository } from '../categories/categories.repository';
import { EnrollmentsRepository } from '../enrollments/enrollments.repository';
import { VARIABLE } from 'src/constants/variable';
import { CourseDetailDto } from './dto/course-detail.dto';

@Injectable()
export class CoursesService {
  constructor(
    private readonly courseRepository: CoursesRepository,
    private readonly categoriesRepository: CategoriesRepository,
    private readonly enrollmentsRepository: EnrollmentsRepository
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
    return this.courseRepository.getUnenrolledCourses(user)
  }

  async enrollCourse(user: AuthUser, courseId: string){
    const courseExist = await this.courseRepository.findById(courseId)
    if(!courseExist){
      throw new NotFoundException(ERROR_MESSAGES.COURSE.NOT_FOUND)
    }
    
    const enrollExist = await this.enrollmentsRepository.findEnrollmentByUserIdAndCourseId(user.id, courseId)
    if(enrollExist){
      throw new ConflictException(ERROR_MESSAGES.ENROLL.ALREADY_EXIST)
    }

    return this.enrollmentsRepository.enrollCourse(user, courseId)
  }

  getMyCourses(user: AuthUser){
    if(user.roleCode === VARIABLE.ROLES.INSTRUCTOR){
      return this.courseRepository.getCourseByInstructorId(user.id)

    } else if(user.roleCode === VARIABLE.ROLES.STUDENT){
      return this.courseRepository.getEnrolledCourses(user.id)
    }
  }

  async getCourseDetail(user: AuthUser, courseId: string) {
    const courseDetail = await this.courseRepository.getCourseDetail(user, courseId)
    
    if(!courseDetail) throw new NotFoundException(ERROR_MESSAGES.COURSE.NOT_FOUND) 

    let courseDetailDto = new CourseDetailDto(courseDetail)
    
    const reviews = await this.enrollmentsRepository.getAllRating(courseId)

    courseDetailDto.reviews = reviews

    return courseDetailDto
}
}
