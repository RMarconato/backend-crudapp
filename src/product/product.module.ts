import { Module } from '@nestjs/common';
import { CategoryModule } from '../category/category.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { ProductController } from './product.controller';
import ProductDaRepository from './product.da.repository';
import { ProductService } from './product.service';

@Module({
  imports: [FavoritesModule, CategoryModule],
  controllers: [ProductController],
  providers: [ProductService, ProductDaRepository],
})
export class ProductModule {}
