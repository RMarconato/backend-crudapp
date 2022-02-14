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

  private getNextProductId(): number {
    if (ProductDaRepository.products.length == 0) return 1;
    const maxId = ProductDaRepository.products.reduce(
      (max, current) => (current.id > max ? current.id : max),
      ProductDaRepository.products[0].id,
    );
    return maxId + 1;
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

  async add(product: ProductModel): Promise<ProductModel> {
    product.id = this.getNextProductId();
    ProductDaRepository.products.push(product);
    return product;
  }

  async update(product: ProductModel): Promise<ProductModel> {
    product.id = this.getNextProductId();
    ProductDaRepository.products.push(product);
    return product;
  }

  async delete(productId: number): Promise<boolean> {
    const productIndex = ProductDaRepository.products.findIndex(
      (prod) => prod.id == productId,
    );
    if (productIndex < 0) return false;
    ProductDaRepository.products.splice(productIndex, 1);
    return true;
  }
}
