import { Injectable } from '@nestjs/common';
import { BaseModel } from 'src/base/base.model';
import mockInitialProducts from '../mock/mockProducts.json';
import { ProductModel } from './product.model';

@Injectable()
export default class ProductDaRepository {
  private static products: ProductModel[];
  constructor() {
    ProductDaRepository.products = [...mockInitialProducts];
  }

  private filterByCategories(categories: BaseModel[]): ProductModel[] {
    const selectedProducts = ProductDaRepository.products.filter((o) =>
      categories.find((f) => f.id == o.categoryId),
    );
    return selectedProducts.map((prod) => new ProductModel(prod));
  }

  private getNextId(categoryId: number): number {
    const categoryProducts = this.filterByCategories([
      new BaseModel(categoryId),
    ]);

    if (categoryProducts.length == 0) return 1;
    const maxId = categoryProducts.reduce(
      (max, current) => (current.id > max ? current.id : max),
      categoryProducts[0].id,
    );

    return maxId + 1;
  }

  private findIndexById(categoryId: number, productId: number): number {
    return ProductDaRepository.products.findIndex(
      (prod) => prod.categoryId == categoryId && prod.id == productId,
    );
  }

  async getProductsByCategories(
    categories: BaseModel[],
  ): Promise<ProductModel[]> {
    const selectedProducts = categories
      ? this.filterByCategories(categories)
      : ProductDaRepository.products;
    return selectedProducts.map((prod) => new ProductModel(prod));
  }

  async add(
    product: ProductModel,
    newProduct?: boolean,
  ): Promise<ProductModel> {
    if (newProduct) product.id = await this.getNextId(product.categoryId);
    ProductDaRepository.products.push(product);
    return product;
  }

  async delete(categoryId: number, productId: number): Promise<boolean> {
    const productIndex = this.findIndexById(categoryId, productId);
    if (productIndex < 0) return false;
    ProductDaRepository.products.splice(productIndex, 1);
    return true;
  }
}
