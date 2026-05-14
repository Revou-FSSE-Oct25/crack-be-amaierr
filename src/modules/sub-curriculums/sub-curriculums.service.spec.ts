import { Test, TestingModule } from '@nestjs/testing';
import { SubCurriculumsService } from './sub-curriculums.service';

describe('SubCurriculumsService', () => {
  let service: SubCurriculumsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubCurriculumsService],
    }).compile();

    service = module.get<SubCurriculumsService>(SubCurriculumsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
