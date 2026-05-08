import { Injectable } from '@nestjs/common';
import { AuthUser } from 'src/authorizations/dto/auth-user.dto';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
  ){}

  
  getAllCategories() {
    return this.categoriesRepository.getAllCategories()
  }
}
