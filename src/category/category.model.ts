import { IBaseModel, BaseModel } from '../base/base.model';

export interface ICategoryModel extends IBaseModel {
  name: string;
}

export class CategoryModel extends BaseModel implements ICategoryModel {
  name: string;
  constructor(category: ICategoryModel) {
    super(category.id);
    this.name = category.name;
  }
}
