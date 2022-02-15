import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import FavoritesDaRepository from './favorites.da.repository';
import { FavoritesService } from './favorites.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesDaRepository],
})
export class FavoritesModule {}
