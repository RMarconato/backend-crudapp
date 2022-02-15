import { Module } from '@nestjs/common';
import FavoritesDaRepository from 'src/favorites/favorites.da.repository';
import { FavoritesService } from 'src/favorites/favorites.service';
import { CategoryService } from '../category/category.service';
import { ProductController } from './product.controller';
import ProductDaRepository from './product.da.repository';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductDaRepository,
    CategoryService,
    FavoritesService,
    FavoritesDaRepository,
  ],
})
export class ProductModule {}
