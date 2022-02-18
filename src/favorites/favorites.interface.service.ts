import { FavoriteItemModel, FavoriteModel } from './favorites.model';

interface IFavoritesService {
  addFavorite(
    userId: number,
    categoryId: number,
    productId: number,
  ): Promise<FavoriteModel>;

  deleteFavorite(
    userId: number,
    categoryId: number,
    productId: number,
  ): Promise<FavoriteModel>;

  getFavorites(userId: number): Promise<FavoriteItemModel[]>;
}

export const FAVORITES_SERVICE_INTERFACE_NAME = 'IFavoritesService';

export default IFavoritesService;
