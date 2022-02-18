import { Test, TestingModule } from '@nestjs/testing';
import ProductDaRepository from './product.da.repository';
import mockProducts from '../mock/mockProducts.json';

describe('ProductRepository', () => {
  let repository: ProductDaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductDaRepository],
    }).compile();

    repository = module.get<ProductDaRepository>(ProductDaRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('add', () => {
    it('should add a new product generating its id', async () => {
      const newProduct = {
        categoryId: 1,
        name: 'product name',
        productDetails: {
          productSpecificProperty: 'some value',
        },
      };
      const result = await repository.add(
        { id: undefined, ...newProduct },
        true,
      );
      const { id, ...expectedResult } = result;
      expect(id).toBeGreaterThan(0);
      expect(expectedResult).toEqual(newProduct);
    });
    it('should add a product into a new category', async () => {
      const newProduct = {
        categoryId: 99,
        name: 'product name',
        productDetails: {
          productSpecificProperty: 'some value',
        },
      };
      const result = await repository.add(
        { id: undefined, ...newProduct },
        true,
      );
      const { id, ...expectedResult } = result;
      expect(id).toBeGreaterThan(0);
      expect(expectedResult).toEqual(newProduct);
    });
    it('should add a new product using existing id', async () => {
      const newProduct = {
        id: 35,
        categoryId: 1,
        name: 'product name',
        productDetails: {
          productSpecificProperty: 'some value',
        },
      };
      const result = await repository.add(newProduct, false);
      expect(result).toEqual(newProduct);
    });
  });
  describe('delete', () => {
    it('should delete a product', async () => {
      const productId = 35,
        categoryId = 1;
      const newProduct = {
        id: productId,
        categoryId,
        name: 'product name',
        productDetails: {
          productSpecificProperty: 'some value',
        },
      };

      await repository.add(newProduct, false);
      const createdProduct = await repository.getProductsByCategoriesAndIds([
        { categoryId, products: [productId] },
      ]);
      expect(createdProduct).toEqual([newProduct]);

      const deleteOperation = await repository.delete(categoryId, productId);
      expect(deleteOperation).toBe(true);

      const deletedProduct = await repository.getProductsByCategoriesAndIds([
        { categoryId, products: [productId] },
      ]);
      expect(deletedProduct).toEqual([]);
    });
    it('should return false if product does not exists', async () => {
      const productId = 35,
        categoryId = 1;

      const createdProduct = await repository.getProductsByCategoriesAndIds([
        { categoryId, products: [productId] },
      ]);
      expect(createdProduct).toEqual([]);

      const deleteOperation = await repository.delete(categoryId, productId);
      expect(deleteOperation).toBe(false);
    });
  });
  describe('getProductsByCategories', () => {
    it('should return all products from selected categories', async () => {
      const newProduct1 = {
        id: undefined,
        categoryId: 80,
        name: 'first product name',
        productDetails: {
          productSpecificProperty: 'some value',
        },
      };
      const newProduct2 = {
        id: undefined,
        categoryId: 80,
        name: 'second product name',
        productDetails: {
          productSpecificProperty: 'some value',
        },
      };
      const newProduct3 = {
        id: undefined,
        categoryId: 81,
        name: 'third product name',
        productDetails: {
          productSpecificProperty: 'some value',
          secondProductSpecificProperty: 'some other value',
        },
      };

      const mockResult = [
        {
          id: 1,
          categoryId: 80,
          name: 'first product name',
          productDetails: { productSpecificProperty: 'some value' },
        },
        {
          id: 2,
          categoryId: 80,
          name: 'second product name',
          productDetails: { productSpecificProperty: 'some value' },
        },
        {
          id: 1,
          categoryId: 81,
          name: 'third product name',
          productDetails: {
            productSpecificProperty: 'some value',
            secondProductSpecificProperty: 'some other value',
          },
        },
      ];

      await repository.add(newProduct1, true);
      await repository.add(newProduct2, true);
      await repository.add(newProduct3, true);

      const result = await repository.getProductsByCategories([
        { id: 80 },
        { id: 81 },
      ]);

      expect(result).toEqual(mockResult);
    });
    it('should return all products if no category is informed', async () => {
      const result = await repository.getProductsByCategories(undefined);

      expect(result).toHaveLength(mockProducts.length);
    });
  });
  describe('getProductsByCategoriesAndIds', () => {
    it('should only return especified products', async () => {
      const newProduct1 = {
        id: undefined,
        categoryId: 80,
        name: 'first product name',
        productDetails: {
          productSpecificProperty: 'some value',
        },
      };
      const newProduct2 = {
        id: undefined,
        categoryId: 80,
        name: 'second product name',
        productDetails: {
          productSpecificProperty: 'some value',
        },
      };
      const newProduct3 = {
        id: undefined,
        categoryId: 81,
        name: 'third product name',
        productDetails: {
          productSpecificProperty: 'some value',
          secondProductSpecificProperty: 'some other value',
        },
      };

      await repository.add(newProduct1, true);
      const prd2 = await repository.add(newProduct2, true);
      const prd3 = await repository.add(newProduct3, true);

      const mockResult = [
        {
          id: prd2.id,
          categoryId: 80,
          name: 'second product name',
          productDetails: { productSpecificProperty: 'some value' },
        },
        {
          id: prd3.id,
          categoryId: 81,
          name: 'third product name',
          productDetails: {
            productSpecificProperty: 'some value',
            secondProductSpecificProperty: 'some other value',
          },
        },
      ];

      const result = await repository.getProductsByCategoriesAndIds([
        { categoryId: prd2.categoryId, products: [prd2.id] },
        { categoryId: prd3.categoryId, products: [prd3.id] },
      ]);

      expect(result).toEqual(mockResult);
    });
  });
});
