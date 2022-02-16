import { Injectable } from '@nestjs/common';
import FavoritesDaRepository from './favorites.da.repository';
import { FavoriteItemModel, FavoriteModel } from './favorites.model';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoritesRepository: FavoritesDaRepository) {}

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
  ): Promise<FavoriteModel | void> {
    return await this.favoritesRepository.delete(userId, categoryId, productId);
  }

  async getFavorites(userId: number): Promise<FavoriteItemModel[]> {
    return await this.favoritesRepository.getUserFavorites(userId);
  }
}
