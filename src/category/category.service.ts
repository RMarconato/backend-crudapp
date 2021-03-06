import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryModel } from './category.model';
import categories from './categories.json';

@Injectable()
export class CategoryService {
  async getAllCategories(): Promise<CategoryModel[]> {
    return categories.map((category) => new CategoryModel(category));
  }

  async getCategoryById(id: number): Promise<CategoryModel> {
    const category = categories.find((category) => category.id == id);
    if (!category) {
      throw new NotFoundException(`Category ${id} does not exists`);
    }
    return new CategoryModel(category);
  }
}
