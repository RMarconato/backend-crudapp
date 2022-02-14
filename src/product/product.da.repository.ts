import { Injectable } from '@nestjs/common';
import { BaseModel } from 'src/base/base.model';
import mockInitialProducts from '../mock/mockProducts.json';
import { ProductModel } from './product.model';

@Injectable()
export default class ProductDaRepository {
  private static products;
  constructor() {
    ProductDaRepository.products = [...mockInitialProducts];
  }

  private getNextId(): number {
    if (ProductDaRepository.products.length == 0) return 1;
    const maxId = ProductDaRepository.products.reduce(
      (max, current) => (current.id > max ? current.id : max),
      ProductDaRepository.products[0].id,
    );
    return maxId + 1;
  }

  private findIndexById(productId: number): number {
    return ProductDaRepository.products.findIndex(
      (prod) => prod.id == productId,
    );
  }

  async getProductsByCategories(
    categories: BaseModel[],
  ): Promise<ProductModel[]> {
    const selectedProducts = categories
      ? ProductDaRepository.products.filter((o) =>
          categories.find((f) => f.id == o.categoryId),
        )
      : ProductDaRepository.products;
    return selectedProducts.map((prod) => new ProductModel(prod));
  }

  async add(
    product: ProductModel,
    newProduct?: boolean,
  ): Promise<ProductModel> {
    if (newProduct) product.id = this.getNextId();
    ProductDaRepository.products.push(product);
    return product;
  }

  async delete(productId: number): Promise<boolean> {
    const productIndex = this.findIndexById(productId);
    if (productIndex < 0) return false;
    ProductDaRepository.products.splice(productIndex, 1);
    return true;
  }
}
