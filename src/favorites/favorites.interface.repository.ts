import { FavoriteItemModel, FavoriteModel } from './favorites.model';

interface IFavoriteRepository {
  add(
    userId: number,
    categoryId: number,
    productId: number,
  ): Promise<FavoriteModel>;
  delete(
    userId: number,
    categoryId: number,
    productId: number,
  ): Promise<FavoriteModel>;
  getUserFavorites(userId: number): Promise<FavoriteItemModel[]>;
}

export const FAVORITE_REPOSITORY_INTERFACE_NAME = 'IFavoriteRepository';

export default IFavoriteRepository;
