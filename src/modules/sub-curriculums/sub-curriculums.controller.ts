import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubCurriculumsService } from './sub-curriculums.service';
import { CreateSubCurriculumDto } from './dto/create-sub-curriculum.dto';
import { User } from 'src/authorizations/decorator/user.decorator';
import { AuthUser } from 'src/authorizations/dto/auth-user.dto';

@Controller('sub-curriculumns')
export class SubCurriculumsController {
  constructor(private readonly subCurriculumsService: SubCurriculumsService) {}

  @Post()
  create(@User() user: AuthUser, @Body() createSubCurriculumDto: CreateSubCurriculumDto) {
    return this.subCurriculumsService.create(user, createSubCurriculumDto);
  }

  @Delete(':id')
  remove(@User() user: AuthUser, @Param('id') id: string) {
    return this.subCurriculumsService.remove(user, id);
  }
}
