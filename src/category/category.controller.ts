import { Controller, Get } from '@nestjs/common';
import { CategoryDTO } from './category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(): Promise<CategoryDTO[]> {
    const categories = await this.categoryService.getAllCategories();
    return categories.map(
      (category) => new CategoryDTO({ id: category.id, name: category.name }),
    );
  }
}
