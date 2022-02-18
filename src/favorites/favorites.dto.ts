export interface IFavoriteDto {
  categoryId: number;
  productId: number;
}

export class FavoriteDto implements IFavoriteDto {
  categoryId: number;
  productId: number;

  constructor(favorite: IFavoriteDto) {
    this.categoryId = favorite.categoryId;
    this.productId = favorite.productId;
  }
}
