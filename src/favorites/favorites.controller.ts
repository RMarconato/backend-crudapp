import { Controller } from '@nestjs/common';

@Controller('favorites')
export class FavoritesController {}

// import { Controller, Get, Request } from '@nestjs/common';
// import { CategoryDto } from './category.dto';
// import { CategoryService } from './category.service';

// @Controller('category')
// export class CategoryController {
//   constructor(private readonly categoryService: CategoryService) {}

//   @Get()
//   async getAllCategories(@Request() req): Promise<CategoryDto[]> {
//     const { user } = req;
//     const categories = await this.categoryService.getAllCategories();
//     return categories.map(
//       (category) => new CategoryDto({ id: category.id, name: category.name }),
//     );
//   }
// }
