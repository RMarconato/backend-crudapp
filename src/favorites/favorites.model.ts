import { BaseModel } from 'src/base/base.model';

export interface IFavoritesItemModel {
  category: string;
  products: BaseModel[];
}

export interface IFavortesModel {
  userId: string;
  products?: IFavoritesItemModel[];
}
