export interface IProductDto {
  id: number;
  name: string;
  categoryId: number;
  productDetails?: object;
}

export class ProductDto implements IProductDto {
  id: number;
  name: string;
  categoryId: number;
  constructor(product: IProductDto) {
    this.id = product.id;
    this.name = product.name;
    this.categoryId = product.categoryId;
    if (product.productDetails) {
      Object.keys(product.productDetails).forEach((p) => {
        this[p] = product.productDetails[p];
      });
    }
  }
}
