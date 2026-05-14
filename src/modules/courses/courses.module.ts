import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CoursesRepository } from './courses.repository';
import { CategoriesRepository } from '../categories/categories.repository';
import { EnrollmentsRepository } from '../enrollments/enrollments.repository';
import { ProgressesRepository } from '../progresses/progresses.repository';
import { SubCurriculumRepository } from '../sub-curriculums/sub-curriculums.repository';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, CoursesRepository, CategoriesRepository, EnrollmentsRepository, SubCurriculumRepository, ProgressesRepository],
})
export class CoursesModule {}
