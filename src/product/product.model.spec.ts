import { ProductModel } from './product.model';

describe('ProductModel', () => {
  it('should create an entity', () => {
    const newProduct = {
      id: 1,
      categoryId: 1,
      name: 'product name',
      productDetails: {
        productSpecificProperty: 'some value',
      },
    };

    const newProducModel = new ProductModel(newProduct);
    expect(newProducModel).toBeDefined();
    expect(Object.keys(newProducModel)).toHaveLength(4);
  });
  describe('toModule', () => {
    it('should create a product model based in a category expected structure', () => {
      const categoryStructure = {
        id: 1,
        name: 'CategoryName',
        productDetails: [
          {
            propertyName: 'property1',
            propertyType: 'string',
            optional: true,
          },
          {
            propertyName: 'property2',
            propertyType: 'number',
            optional: false,
          },
        ],
      };
      const newProduct = {
        id: 1,
        categoryId: 1,
        name: 'product name',
        property1: 'property 1 some value',
        property2: 437,
      };
      const expectedResult = {
        id: 1,
        categoryId: 1,
        name: 'product name',
        productDetails: {
          property1: 'property 1 some value',
          property2: 437,
        },
      };

      expect(ProductModel.toModel(newProduct, categoryStructure)).toEqual(
        expectedResult,
      );
    });
  });
});
