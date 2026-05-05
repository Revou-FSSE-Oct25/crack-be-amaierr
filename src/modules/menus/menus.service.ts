import { Injectable } from '@nestjs/common';
import { MenusRepository } from './menus.repository';

@Injectable()
export class MenusService {
  constructor(private readonly menusRepository: MenusRepository){}

  findAll() {
    return this.menusRepository.findAll()
  }
}
