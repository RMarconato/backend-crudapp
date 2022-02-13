import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { FavoriteModule } from './favorite/favorite.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [ProductModule, FavoriteModule, CategoryModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
