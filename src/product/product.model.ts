import { CategoryModel } from 'src/category/category.model';
import { IBaseModel, BaseModel } from '../base/base.model';

export interface IProductModel extends IBaseModel {
  categoryId: number;
  name: string;
  productDetails: object;
}

export class ProductModel extends BaseModel implements IProductModel {
  categoryId: number;
  name: string;
  productDetails: object;

  constructor(product: IProductModel) {
    super(product.id);
    this.categoryId = product.categoryId;
    this.name = product.name;
    this.productDetails = product.productDetails;
  }

  static toModel(product: unknown, category: CategoryModel): ProductModel {
    const prdDet = new Object();
    category.productDetails.forEach((detail) => {
      if (product.hasOwnProperty(detail.propertyName)) {
        prdDet[detail.propertyName] = product[detail.propertyName];
      }
    });

    return new ProductModel({
      id: undefined,
      categoryId: product['categoryId'],
      name: product['name'],
      productDetails: prdDet,
    });
  }
}
