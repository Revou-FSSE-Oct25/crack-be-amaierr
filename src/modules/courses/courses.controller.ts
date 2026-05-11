import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { User } from 'src/authorizations/decorator/user.decorator';
import { AuthUser } from 'src/authorizations/dto/auth-user.dto';
import { Roles } from 'src/authorizations/decorator/roles.decorator';
import { VARIABLE } from 'src/constants/variable';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Roles(VARIABLE.ROLES.INSTRUCTOR)
  @Post()
  createCourse(@User() user: AuthUser, @Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.createCourse(user, createCourseDto);
  }

  @Get('/browse')
  getUnenrolledCourses(@User() user: AuthUser) {
    return this.coursesService.getUnenrolledCourses(user);
  }

  @Roles(VARIABLE.ROLES.STUDENT)
  @Post('/enroll/:course_id')
  enrollCourse(@User() user: AuthUser, @Param('course_id') courseId: string){
    return this.coursesService.enrollCourse(user, courseId)
  }

  @Get('/my-courses')
  getMyCourses(@User() user: AuthUser){
    return this.coursesService.getMyCourses(user)
  }

  @Get('/course/:course_id')
  getCourseDetail(@User() user: AuthUser, @Param('course_id') courseId: string){
    return this.coursesService.getCourseDetail(user, courseId)
  }
}
