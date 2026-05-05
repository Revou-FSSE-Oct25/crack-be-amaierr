import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenusService } from './menus.service';
import { Public } from 'src/authorizations/decorator/public.decorator';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Public()
  @Get()
  findAll() {
    return this.menusService.findAll();
  }
}
