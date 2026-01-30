import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category, Prisma, Task } from '@prisma/client';

@Controller('category')
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) { }

  @Post()
  async category(
    @Body() data: {
      name: string,
    },
  ): Promise<Category> {
    return this.CategoryService.createCategory({
      name: data.name,
    }
    );
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<Category | null> {
    return this.CategoryService.category({ id: id });
  }


  @Get()
  async getAllCategorys(): Promise<Category[] | null> {
    return this.CategoryService.categorys({})
  }

  @Patch(':id')
  async updateCategory(@Param('id') id: string, @Body() data: Prisma.CategoryUncheckedUpdateInput): Promise<Category | null> {
    return this.CategoryService.updateCategory({
      where: { id },
      data: data
    })
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<Category> {
    return this.CategoryService.deleteCategory({ id })
  }
}
