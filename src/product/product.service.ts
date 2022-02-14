import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductModel } from './product.model';
import { BaseModel } from 'src/base/base.model';
import { StatusCodes } from 'http-status-codes';
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
    return this.productRepository.add(product);
  }

  async deleteProductById(productId: number): Promise<void> {
    if (!(await this.productRepository.delete(productId)))
      throw new NotFoundException(`Product ${productId} not found.`);
  }
}
