import { BaseModel } from '../base/base.model';
import { FavoriteItemModel } from '../favorites/favorites.model';
import { ProductModel } from './product.model';

interface IProductService {
  getProductsByCategories(categories: BaseModel[]): Promise<ProductModel[]>;
  getProductsByCategoriesAndIds(
    filter: FavoriteItemModel[],
  ): Promise<ProductModel[]>;
  addProduct(product: ProductModel): Promise<ProductModel>;
  deleteProductById(categoryId: number, productId: number): Promise<void>;
  updateProduct(product: ProductModel): Promise<ProductModel>;
}

export const PRODUCT_SERVICE_INTERFACE_NAME = 'IProductService';

export default IProductService;
