import { Module } from '@nestjs/common';
import { CategoryModule } from '../category/category.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { ProductController } from './product.controller';
import ProductDaRepository from './product.da.repository';
import { PRODUCT_REPOSITORY_INTERFACE_NAME } from './product.interface.repository';
import { PRODUCT_SERVICE_INTERFACE_NAME } from './product.interface.service';
import { ProductService } from './product.service';

const injectors = [
  {
    provide: PRODUCT_REPOSITORY_INTERFACE_NAME,
    useClass: ProductDaRepository,
  },
  {
    provide: PRODUCT_SERVICE_INTERFACE_NAME,
    useClass: ProductService,
  },
];
@Module({
  imports: [FavoritesModule, CategoryModule],
  controllers: [ProductController],
  providers: injectors,
  exports: injectors,
})
export class ProductModule {}
