import { CategoryModel } from './category.model';

interface ICategoryService {
  getAllCategories(): Promise<CategoryModel[]>;

  getCategoryById(id: number): Promise<CategoryModel>;
}

export const CATEGORY_SERVICE_INTERFACE_NAME = 'ICategoryService';

export default ICategoryService;
