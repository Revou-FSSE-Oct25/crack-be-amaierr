import { Test, TestingModule } from '@nestjs/testing';
import { SubCurriculumsController } from './sub-curriculums.controller';
import { SubCurriculumsService } from './sub-curriculums.service';

describe('SubCurriculumsController', () => {
  let controller: SubCurriculumsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubCurriculumsController],
      providers: [SubCurriculumsService],
    }).compile();

    controller = module.get<SubCurriculumsController>(SubCurriculumsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
