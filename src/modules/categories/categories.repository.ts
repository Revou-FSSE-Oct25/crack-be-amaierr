import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class CategoriesRepository {
    constructor(private prisma: PrismaService) {}

    async findById(id: string){
        return this.prisma.category.findUnique({
            where: { id: id }
        })
    }

    async getAllCategories(){
        return this.prisma.category.findMany()
    }
}