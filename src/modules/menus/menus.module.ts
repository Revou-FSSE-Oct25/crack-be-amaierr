import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { MenusRepository } from './menus.repository';

@Module({
  controllers: [MenusController],
  providers: [MenusService, MenusRepository],
})
export class MenusModule {}
