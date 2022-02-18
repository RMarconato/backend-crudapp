import { CategoryModel } from './category.model';

describe('CategoryModel', () => {
  it('should create an entity from the model', () => {
    const sampleProductDetail = {
      propertyName: 'description',
      propertyType: 'string',
      optional: true,
    };

    const sampleCategory = {
      id: 999,
      name: 'some name',
      productDetails: [sampleProductDetail],
    };

    const newCategory = new CategoryModel(sampleCategory);

    expect(newCategory).toBeDefined();
    expect(Object.keys(newCategory)).toHaveLength(3);
  });
});
