import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from './categories.repository';
import { EnrollmentsRepository } from '../enrollments/enrollments.repository';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository, EnrollmentsRepository],
})
export class CategoriesModule {}
