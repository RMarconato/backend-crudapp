import { IBaseModel, BaseModel } from '../base/base.model';

export interface IProductDetail {
  propertyName: string;
  propertyType: string;
  optional: boolean;
}

export interface ICategoryModel extends IBaseModel {
  name: string;
  productDetails: IProductDetail[];
}

export class CategoryModel extends BaseModel implements ICategoryModel {
  name: string;
  productDetails: IProductDetail[];
  constructor(category: ICategoryModel) {
    super(category.id);
    this.name = category.name;
    this.productDetails = category.productDetails;
  }
}
