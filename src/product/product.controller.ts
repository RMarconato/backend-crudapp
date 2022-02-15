import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { BaseModel } from '../base/base.model';
import { CategoryService } from '../category/category.service';
import { ProductDto } from './product.dto';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  private async checkProductProperties(
    product: unknown,
    checkId?: boolean,
  ): Promise<boolean> {
    if (checkId) {
      if (!product.hasOwnProperty('id')) {
        throw new UnprocessableEntityException('Missing product id');
      }

      if (typeof product['id'] != 'number') {
        throw new UnprocessableEntityException(
          'id type is wrong. Expected number',
        );
      }
    }

    if (!product.hasOwnProperty('categoryId')) {
      throw new UnprocessableEntityException('Missing product category');
    }

    if (typeof product['categoryId'] != 'number') {
      throw new UnprocessableEntityException(
        'categoryId type is wrong. Expected number',
      );
    }

    if (!product.hasOwnProperty('name') || product['name'].length == 0) {
      throw new UnprocessableEntityException('Missing product name');
    }

    const category = await this.categoryService.getCategoryById(
      product['categoryId'],
    );

    category.productDetails.forEach((productDetail) => {
      if (!product.hasOwnProperty(productDetail.propertyName)) {
        if (productDetail.optional) return;
        throw new UnprocessableEntityException(
          `Missing product ${productDetail.propertyName}`,
        );
      }
      if (
        typeof product[productDetail.propertyName] != productDetail.propertyType
      )
        throw new UnprocessableEntityException(
          `${productDetail.propertyName} type is wrong. Expected ${productDetail.propertyType}`,
        );
    });
    return true;
  }

  @Get()
  async getProductsByCategory(
    @Query('categories')
    categories?: number,
  ): Promise<ProductDto[]> {
    let categ;
    if (categories)
      categ = Array.isArray(categories)
        ? categories.map((c) => new BaseModel(c))
        : (categ = [new BaseModel(categories as number)]);

    const products = await this.productService.getProductsByCategories(categ);
    return products.map(
      (prod) =>
        new ProductDto({
          id: prod.id,
          categoryId: prod.categoryId,
          name: prod.name,
          productDetails: prod.productDetails,
        }),
    );
  }

  @Put()
  async addProduct(@Body() product: unknown): Promise<ProductDto> {
    await this.checkProductProperties(product);

    const category = await this.categoryService.getCategoryById(
      product['categoryId'],
    );
    const newProduct = await this.productService.addProduct(
      ProductModel.toModel(product, category),
    );
    return new ProductDto({
      id: newProduct.id,
      categoryId: newProduct.categoryId,
      name: newProduct.name,
      productDetails: newProduct.productDetails,
    });
  }

  @Delete(':categoryId/:productId/delete')
  async deleteProductById(
    @Param() params: { categoryId: number; productId: number },
  ) {
    await this.productService.deleteProductById(
      Number(params.categoryId),
      Number(params.productId),
    );
  }

  @Post(':categoryId/:productId/update')
  async updateProduct(
    @Param() params: { categoryId: number; productId: number },
    @Body() product: object,
  ): Promise<ProductDto> {
    const updatingProduct = {
      id: Number(params.productId),
      categoryId: Number(params.categoryId),
      ...product,
    };

    console.log('updatingProduct', updatingProduct);

    await this.checkProductProperties(updatingProduct, true);

    const category = await this.categoryService.getCategoryById(
      updatingProduct.categoryId,
    );

    const updatedProduct = await this.productService.updateProduct(
      ProductModel.toModel(updatingProduct, category),
    );

    return new ProductDto({
      id: updatedProduct.id,
      categoryId: updatedProduct.categoryId,
      name: updatedProduct.name,
      productDetails: updatedProduct.productDetails,
    });
  }
}
