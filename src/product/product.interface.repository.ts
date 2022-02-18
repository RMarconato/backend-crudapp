import { BaseModel } from '../base/base.model';
import { FavoriteItemModel } from '../favorites/favorites.model';
import { ProductModel } from './product.model';

interface IProductRepository {
  getProductsByCategories(categories: BaseModel[]): Promise<ProductModel[]>;
  getProductsByCategoriesAndIds(
    filter: FavoriteItemModel[],
  ): Promise<ProductModel[]>;
  add(product: ProductModel, newProduct?: boolean): Promise<ProductModel>;
  delete(categoryId: number, productId: number): Promise<boolean>;
}

export const PRODUCT_REPOSITORY_INTERFACE_NAME = 'IProductRepository';

export default IProductRepository;
