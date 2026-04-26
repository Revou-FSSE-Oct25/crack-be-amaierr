import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { User } from 'src/authorizations/decorator/user.decorator';
import { AuthUser } from 'src/authorizations/dto/auth-user.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  createCourse(@User() user: AuthUser, @Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.createCourse(user, createCourseDto);
  }

  @Get('/browse')
  getUnenrolledCourses(@User() user: AuthUser) {
    return this.coursesService.getUnenrolledCourses(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
