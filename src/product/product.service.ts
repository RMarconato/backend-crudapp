import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductModel } from './product.model';
import { BaseModel } from 'src/base/base.model';
import ProductDaRepository from './product.da.repository';
@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductDaRepository) {}

  async getProductsByCategories(
    categories: BaseModel[],
  ): Promise<ProductModel[]> {
    return this.productRepository.getProductsByCategories(categories);
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
