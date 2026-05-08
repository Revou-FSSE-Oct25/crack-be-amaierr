import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthorizationsModule } from './authorizations/authorizations.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './authorizations/guards/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { CoursesModule } from './modules/courses/courses.module';
import { RolesGuard } from './authorizations/guards/roles.guard';
import { MenusModule } from './modules/menus/menus.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule, AuthorizationsModule, UsersModule, CoursesModule, MenusModule, CategoriesModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
