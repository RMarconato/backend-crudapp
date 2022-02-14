import { Injectable } from '@nestjs/common';
import { ProductModel } from './product.model';
import { BaseModel } from 'src/base/base.model';
import mockProducts from '../mock/mockProducts.json';
@Injectable()
export class ProductService {
  async getProductsByCategories(
    categories: BaseModel[],
  ): Promise<ProductModel[]> {
    const selectedProducts = categories
      ? mockProducts.filter((o) => categories.find((f) => f.id == o.id))
      : mockProducts;
    return selectedProducts.map((prod) => new ProductModel(prod));
  }
}
