import { Module } from '@nestjs/common';
import { SubCurriculumsService } from './sub-curriculums.service';
import { SubCurriculumsController } from './sub-curriculums.controller';
import { SubCurriculumRepository } from './sub-curriculums.repository';
import { CurriculumRepository } from '../curriculums/curriculum.repository';
import { EnrollmentsRepository } from '../enrollments/enrollments.repository';
import { ProgressesRepository } from '../progresses/progresses.repository';

@Module({
  controllers: [SubCurriculumsController],
  providers: [SubCurriculumsService, SubCurriculumRepository, CurriculumRepository, EnrollmentsRepository, ProgressesRepository],
})
export class SubCurriculumsModule {}
