import { Inject, Injectable } from '@nestjs/common';
import IFavoriteRepository, {
  FAVORITE_REPOSITORY_INTERFACE_NAME,
} from './favorites.interface.repository';
import IFavoritesService from './favorites.interface.service';
import { FavoriteItemModel, FavoriteModel } from './favorites.model';

@Injectable()
export class FavoritesService implements IFavoritesService {
  constructor(
    @Inject(FAVORITE_REPOSITORY_INTERFACE_NAME)
    private favoritesRepository: IFavoriteRepository,
  ) {}

  async addFavorite(
    userId: number,
    categoryId: number,
    productId: number,
  ): Promise<FavoriteModel> {
    return await this.favoritesRepository.add(userId, categoryId, productId);
  }

  async deleteFavorite(
    userId: number,
    categoryId: number,
    productId: number,
  ): Promise<FavoriteModel> {
    return await this.favoritesRepository.delete(userId, categoryId, productId);
  }

  async getFavorites(userId: number): Promise<FavoriteItemModel[]> {
    return await this.favoritesRepository.getUserFavorites(userId);
  }
}
