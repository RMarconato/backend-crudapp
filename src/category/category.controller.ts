import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';

@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(): Promise<CategoryDto[]> {
    const categories = await this.categoryService.getAllCategories();
    return categories.map(
      (category) => new CategoryDto({ id: category.id, name: category.name }),
    );
  }
}
