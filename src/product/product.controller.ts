import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Request,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoriteDto } from '../favorites/favorites.dto';
import IFavoritesService, {
  FAVORITES_SERVICE_INTERFACE_NAME,
} from '../favorites/favorites.interface.service';
import { BaseModel } from '../base/base.model';
import { ProductDto } from './product.dto';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';
import ICategoryService, {
  CATEGORY_SERVICE_INTERFACE_NAME,
} from '../category/category.interface.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject(CATEGORY_SERVICE_INTERFACE_NAME)
    private categoryService: ICategoryService,
    @Inject(FAVORITES_SERVICE_INTERFACE_NAME)
    private favoritesService: IFavoritesService,
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
    @Query()
    query: {
      categories?: number[];
    },
  ): Promise<ProductDto[]> {
    let categ;
    if (query.categories)
      categ = Array.isArray(query.categories)
        ? query.categories.map((c) => new BaseModel(c))
        : (categ = [new BaseModel(query.categories as number)]);

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

  @Post()
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

  @Put(':categoryId/:productId/update')
  async updateProduct(
    @Param() params: { categoryId: number; productId: number },
    @Body() product: object,
  ): Promise<ProductDto> {
    const updatingProduct = {
      id: Number(params.productId),
      categoryId: Number(params.categoryId),
      ...product,
    };

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

  @Get('/favorites')
  async getFavorites(@Request() req): Promise<ProductDto[]> {
    const { user } = req;
    const userFavorites = await this.favoritesService.getFavorites(user.userId);

    if (!userFavorites) return [];

    return await this.productService.getProductsByCategoriesAndIds(
      userFavorites,
    );
  }

  @Post('/favorites')
  async addFavorite(
    @Request() req,
    @Body() favorite: FavoriteDto,
  ): Promise<void> {
    const { user } = req;

    await this.favoritesService.addFavorite(
      user.userId,
      favorite.categoryId,
      favorite.productId,
    );
  }

  @Delete('/favorites/:categoryId/:productId/delete')
  async deleteFavorite(
    @Request() req,
    @Param() params: { categoryId: number; productId: number },
  ): Promise<void> {
    const { user } = req;

    await this.favoritesService.deleteFavorite(
      user.userId,
      params.categoryId,
      params.productId,
    );
  }
}
