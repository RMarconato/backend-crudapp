export interface IFavoriteItemModel {
  categoryId: number;
  products: number[];
}

export interface IFavorteModel {
  userId: number;
  favorites: IFavoriteItemModel[];
}

export class FavoriteItemModel implements IFavoriteItemModel {
  categoryId: number;
  products: number[];

  constructor(favoriteItemModel: IFavoriteItemModel) {
    this.categoryId = favoriteItemModel.categoryId;
    this.products = favoriteItemModel.products;
  }
}

export class FavoriteModel implements IFavorteModel {
  userId: number;
  favorites: FavoriteItemModel[];

  constructor(favoriteModel: IFavorteModel) {
    this.userId = favoriteModel.userId;
    this.favorites = favoriteModel.favorites;
  }
}
