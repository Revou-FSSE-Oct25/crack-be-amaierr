import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
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

  @Post('/enroll')
  enrollCourse(@User() user: AuthUser, @Body() courseId: string){
    return this.coursesService.enrollCourse(user, courseId)
  }
}
