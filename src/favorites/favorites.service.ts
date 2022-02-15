import { Injectable } from '@nestjs/common';
import FavoritesDaRepository from './favorites.da.repository';
import { FavoriteModel } from './favorites.model';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoritesRepository: FavoritesDaRepository) {}

  async addFavorite(
    userId: number,
    categoryId: number,
    productId: number,
  ): Promise<FavoriteModel> {
    return this.favoritesRepository.add(userId, categoryId, productId);
  }

  async deleteFavorite(
    userId: number,
    categoryId: number,
    productId: number,
  ): Promise<FavoriteModel | void> {
    return this.favoritesRepository.delete(userId, categoryId, productId);
  }
}
