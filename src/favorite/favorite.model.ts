import { BaseModel } from 'src/base/base.model';

export interface IFavoriteItemModel {
  category: string;
  products: BaseModel[];
}

export interface IFavorteModel {
  userId: string;
  products?: IFavoriteItemModel[];
}
