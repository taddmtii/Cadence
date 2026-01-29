import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Prisma, Category } from "@prisma/client";

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { }

  async category(categoryWhereUniqueInput: Prisma.CategoryWhereUniqueInput): Promise<Category | null> {
    return this.prisma.category.findUnique({ where: categoryWhereUniqueInput })
  }

  async categorys(params: {
    skip?: number; // skip first N users (for pagination)
    take?: number; // limits how many results returned
    cursor?: Prisma.CategoryWhereUniqueInput; // for pagination
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput; // sorts results
  }): Promise<Category[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.category.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createCategory(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({ data })
  }

  async updateCategory(params: {
    where: Prisma.CategoryWhereUniqueInput;
    data: Prisma.CategoryUpdateInput;
  }): Promise<Category> {
    const { where, data } = params;
    return this.prisma.category.update({ data, where });
  }

  async deleteCategory(where: Prisma.CategoryWhereUniqueInput): Promise<Category> {
    return this.prisma.category.delete({ where });
  }
}
