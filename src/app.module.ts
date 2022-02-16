import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { FavoritesModule } from './favorites/favorites.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    ProductModule,
    FavoritesModule,
    CategoryModule,
    AuthModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
