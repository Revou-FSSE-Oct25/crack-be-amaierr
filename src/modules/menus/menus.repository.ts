import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class MenusRepository {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.menu.findMany({
      select: {path: true}
    })
  }
}