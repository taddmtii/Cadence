import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category, Prisma, Task } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async category(
    @Body() data: {
      name: string,
      color: string,
      userId: string
    },
  ): Promise<Category> {
    return this.CategoryService.createCategory({
      name: data.name,
      color: data.color,
      user: {
        connect: { id: data.userId }
      },
    }
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllCategorys(): Promise<Category[] | null> {
    return this.CategoryService.categorys({})
  }

  @UseGuards(JwtAuthGuard)
  @Get('category-name/:name')
  async getCategoryByName(@Param('name') name: string) {
    return this.CategoryService.category({ name: name })
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<Category | null> {
    return this.CategoryService.category({ id: id });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateCategory(@Param('id') id: string, @Body() data: Prisma.CategoryUncheckedUpdateInput): Promise<Category | null> {
    return this.CategoryService.updateCategory({
      where: { id },
      data: data
    })
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<Category> {
    return this.CategoryService.deleteCategory({ id })
  }
}
