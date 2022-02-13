import { Injectable } from '@nestjs/common';
import { CategoryModel } from './category.model';
import categories from './categories.json';

@Injectable()
export class CategoryService {
  async getAllCategories(): Promise<CategoryModel[]> {
    return categories.map((category) => new CategoryModel(category));
  }
}
