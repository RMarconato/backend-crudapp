import { Module } from '@nestjs/common';
import FavoritesDaRepository from './favorites.da.repository';
import { FavoritesService } from './favorites.service';

@Module({
  providers: [FavoritesService, FavoritesDaRepository],
})
export class FavoritesModule {}
