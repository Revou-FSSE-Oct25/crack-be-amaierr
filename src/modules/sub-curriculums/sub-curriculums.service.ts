import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubCurriculumDto } from './dto/create-sub-curriculum.dto';
import { SubCurriculumRepository } from './sub-curriculums.repository';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import { AuthUser } from 'src/authorizations/dto/auth-user.dto';
import { CurriculumRepository } from '../curriculums/curriculum.repository';
import { EnrollmentsRepository } from '../enrollments/enrollments.repository';
import { CreateCourseProgressDto } from '../progresses/dto/create-progress.dto';
import { ProgressesRepository } from '../progresses/progresses.repository';

@Injectable()
export class SubCurriculumsService {
  constructor(
    private readonly subCurriculumRepository: SubCurriculumRepository,
    private readonly curriculumRepository: CurriculumRepository,
    private readonly enrollmentsRepository: EnrollmentsRepository,
    private readonly progressesRepository: ProgressesRepository,
  ){}

  async create(user: AuthUser, createSubCurriculumDto: CreateSubCurriculumDto) {
    const curriculum = await this.curriculumRepository.findById(createSubCurriculumDto.curriculumnId)

    if(!curriculum){
      throw new NotFoundException(ERROR_MESSAGES.CURRICULUM.NOT_FOUND)
    }
    
    if(!curriculum.course.instructorId.startsWith(user.id)){
      throw new ForbiddenException(ERROR_MESSAGES.SUB_CURRICULUM.CREATE_FORBIDDEN)
    }
    
    const createRes = await this.subCurriculumRepository.createSubCurriculum(createSubCurriculumDto);

    const usersEnrolled = await this.enrollmentsRepository.findUsersEnrolledByCourseId(curriculum.course.id)

    let progressesData: CreateCourseProgressDto[] = []

    usersEnrolled.map(user =>{
      progressesData.push({
        userId: user.userId,
        subCurriculumId: createRes.id,
      })
    })

    await this.progressesRepository.createNewCourseProgresses(progressesData)

    return createRes
  }

  async remove(user: AuthUser, id: string) {
    const subCurriculum = await this.subCurriculumRepository.findById(id)

    if(!subCurriculum){
      throw new NotFoundException(ERROR_MESSAGES.SUB_CURRICULUM.NOT_FOUND)
    }

    if(!subCurriculum.curriculumn.course.instructorId.startsWith(user.id)){
      throw new ForbiddenException(ERROR_MESSAGES.SUB_CURRICULUM.DELETE_FORBIDDEN)
    }

    return this.subCurriculumRepository.deleteSubCurriculum(id);
  }
}
