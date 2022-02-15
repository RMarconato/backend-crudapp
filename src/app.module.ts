import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { FavoriteModule } from './favorite/favorite.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ProductModule,
    FavoriteModule,
    CategoryModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
