import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductModel } from './product.model';
import { BaseModel } from '../base/base.model';
import { FavoriteItemModel } from '../favorites/favorites.model';
import IProductService from './product.interface.service';
import IProductRepository, {
  PRODUCT_REPOSITORY_INTERFACE_NAME,
} from './product.interface.repository';
@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY_INTERFACE_NAME)
    private productRepository: IProductRepository,
  ) {}

  async getProductsByCategories(
    categories: BaseModel[],
  ): Promise<ProductModel[]> {
    return this.productRepository.getProductsByCategories(categories);
  }

  async getProductsByCategoriesAndIds(
    filter: FavoriteItemModel[],
  ): Promise<ProductModel[]> {
    return this.productRepository.getProductsByCategoriesAndIds(filter);
  }

  async addProduct(product: ProductModel): Promise<ProductModel> {
    return this.productRepository.add(product, true);
  }

  async deleteProductById(
    categoryId: number,
    productId: number,
  ): Promise<void> {
    if (!(await this.productRepository.delete(categoryId, productId)))
      throw new NotFoundException(`Product ${productId} not found.`);
  }

  async updateProduct(product: ProductModel): Promise<ProductModel> {
    if (!(await this.productRepository.delete(product.categoryId, product.id)))
      throw new NotFoundException(`Product ${product.id} not found.`);
    return this.productRepository.add(product, false);
  }
}
