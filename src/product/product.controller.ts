import { Controller, Get, Query } from '@nestjs/common';
import { BaseModel } from 'src/base/base.model';
import { ProductDto } from './product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProductsByCategory(
    @Query('categories')
    categories?: any,
  ): Promise<ProductDto[]> {
    let categ;
    if (categories)
      categ = Array.isArray(categories)
        ? categories.map((c) => new BaseModel(c))
        : (categ = [new BaseModel(categories as number)]);

    const products = await this.productService.getProductsByCategories(categ);
    return products.map((prod) => new ProductDto(prod));
  }
}
