import { Controller, Get, Inject } from '@nestjs/common';
import { CategoryDto } from './category.dto';
import { CategoryService, CATEGORY_SERVICE_NAME } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(
    @Inject(CATEGORY_SERVICE_NAME) private categoryService: CategoryService,
  ) {}

  @Get()
  async getAllCategories(): Promise<CategoryDto[]> {
    const categories = await this.categoryService.getAllCategories();
    return categories.map(
      (category) => new CategoryDto({ id: category.id, name: category.name }),
    );
  }
}
