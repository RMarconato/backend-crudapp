import { Module } from '@nestjs/common';
import FavoritesDaRepository from './favorites.da.repository';
import { FAVORITE_REPOSITORY_INTERFACE_NAME } from './favorites.interface.repository';
import { FAVORITES_SERVICE_INTERFACE_NAME } from './favorites.interface.service';
import { FavoritesService } from './favorites.service';

const injectors = [
  {
    provide: FAVORITES_SERVICE_INTERFACE_NAME,
    useClass: FavoritesService,
  },
  {
    provide: FAVORITE_REPOSITORY_INTERFACE_NAME,
    useClass: FavoritesDaRepository,
  },
];

@Module({
  providers: injectors,
  exports: injectors,
})
export class FavoritesModule {}
