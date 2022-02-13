import { ProductModel } from '../product/product.model';

export interface IFavorteModel {
  userId: string;
  products?: ProductModel[];
}
