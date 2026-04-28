import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CoursesRepository } from './courses.repository';
import { CategoriesRepository } from '../categories/categories.repository';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, CoursesRepository, CategoriesRepository],
})
export class CoursesModule {}
