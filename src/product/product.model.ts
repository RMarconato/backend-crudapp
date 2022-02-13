import { IBaseModel, BaseModel } from '../base/base.model';

export interface IProductModel extends IBaseModel {
  categoryId: string;
  name: string;
  productDetails: object;
}

export class ProductModel extends BaseModel implements IProductModel {
  categoryId: string;
  name: string;
  productDetails: object;

  constructor(product: IProductModel) {
    super(product.id);
    this.categoryId = product.categoryId;
    this.name = product.name;
    this.productDetails = product.productDetails;
  }
}
