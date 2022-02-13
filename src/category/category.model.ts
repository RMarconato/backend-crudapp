import { IBaseModel, BaseModel } from '../base/base.model';

interface ProductDetail {
  propertyName: string;
  propertyType: string;
  optional: boolean;
}

export interface ICategoryModel extends IBaseModel {
  name: string;
  productDetails: ProductDetail[];
}

export class CategoryModel extends BaseModel implements ICategoryModel {
  name: string;
  productDetails: ProductDetail[];
  constructor(category: ICategoryModel) {
    super(category.id);
    this.name = category.name;
    this.productDetails = category.productDetails;
  }
}
