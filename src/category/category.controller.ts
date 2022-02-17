import { Controller, Get, Inject } from '@nestjs/common';
import { CategoryDto } from './category.dto';
import ICategoryService, {
  CATEGORY_SERVICE_INTERFACE_NAME,
} from './category.interface.service';

@Controller('category')
export class CategoryController {
  constructor(
    @Inject(CATEGORY_SERVICE_INTERFACE_NAME)
    private categoryService: ICategoryService,
  ) {}

  @Get()
  async getAllCategories(): Promise<CategoryDto[]> {
    const categories = await this.categoryService.getAllCategories();
    return categories.map(
      (category) => new CategoryDto({ id: category.id, name: category.name }),
    );
  }
}
