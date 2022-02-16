import { Injectable } from '@nestjs/common';
import { FavoriteItemModel, FavoriteModel } from './favorites.model';

@Injectable()
export default class FavoritesDaRepository {
  private static favorites: FavoriteModel[];
  constructor() {
    FavoritesDaRepository.favorites = [];
  }

  private findFavoritesByUser(userId: number): FavoriteModel {
    const userFavorites = FavoritesDaRepository.favorites.find(
      (f) => f.userId == userId,
    );
    return userFavorites;
  }

  async add(
    userId: number,
    categoryId: number,
    productId: number,
  ): Promise<FavoriteModel> {
    const userFavorites = this.findFavoritesByUser(userId);

    if (!userFavorites) {
      const newUserFavorite = new FavoriteModel({
        userId,
        favorites: [
          new FavoriteItemModel({
            categoryId,
            products: [productId],
          }),
        ],
      });
      FavoritesDaRepository.favorites.push(newUserFavorite);
      return newUserFavorite;
    }

    const category = userFavorites.favorites.find(
      (c) => c.categoryId == categoryId,
    );

    if (category?.products.includes(productId)) return userFavorites;

    if (category) {
      category.products.push(productId);
      return userFavorites;
    }

    userFavorites.favorites.push(
      new FavoriteItemModel({
        categoryId,
        products: [productId],
      }),
    );
    return userFavorites;
  }

  async delete(
    userId: number,
    categoryId: number,
    productId: number,
  ): Promise<FavoriteModel | void> {
    const userFavorites = this.findFavoritesByUser(userId);

    const category = userFavorites?.favorites.find(
      (c) => c.categoryId == categoryId,
    );

    const productIdx = category?.products.findIndex((p) => p == productId);

    if (productIdx < 0) return;
    category.products.splice(productIdx, 1);
    return userFavorites;
  }

  async getUserFavorites(userId: number): Promise<FavoriteItemModel[]> {
    return this.findFavoritesByUser(userId)?.favorites;
  }
}
