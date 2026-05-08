import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Public } from 'src/authorizations/decorator/public.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Public()
  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }
}
