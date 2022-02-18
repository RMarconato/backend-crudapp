import { Test, TestingModule } from '@nestjs/testing';
import { CATEGORY_SERVICE_INTERFACE_NAME } from '../category/category.interface.service';
import { FAVORITES_SERVICE_INTERFACE_NAME } from '../favorites/favorites.interface.service';
import { PRODUCT_SERVICE_INTERFACE_NAME } from './product.interface.service';
import { ProductController } from './product.controller';
import { ProductDto } from './product.dto';
import { hasUncaughtExceptionCaptureCallback } from 'process';

const mockCategoryService = {
  getAllCategories: jest.fn(),
  getCategoryById: jest.fn(),
};

const mockFavoritesService = {
  addFavorite: jest.fn(),
  deleteFavorite: jest.fn(),
  getFavorites: jest.fn(),
};

const mockProductService = {
  getProductsByCategories: jest.fn(),
  getProductsByCategoriesAndIds: jest.fn(),
  addProduct: jest.fn(),
  deleteProductById: jest.fn(),
  updateProduct: jest.fn(),
};

describe('ProductController', () => {
  let controller: ProductController;
  const sampleCategoryConfiguration = {
    id: 1,
    name: 'some name',
    productDetails: [
      {
        propertyName: 'stringProperty',
        propertyType: 'string',
        optional: false,
      },
      {
        propertyName: 'numberProperty',
        propertyType: 'number',
        optional: false,
      },
      {
        propertyName: 'optionalProperty',
        propertyType: 'string',
        optional: true,
      },
    ],
  };
  const sampleProduct = {
    id: 1,
    categoryId: 1,
    name: 'sample product',
    productDetails: {
      stringProperty: 'some value',
      numberProperty: 35,
      optionalProperty: 'optional',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: CATEGORY_SERVICE_INTERFACE_NAME,
          useValue: mockCategoryService,
        },
        {
          provide: FAVORITES_SERVICE_INTERFACE_NAME,
          useValue: mockFavoritesService,
        },
        {
          provide: PRODUCT_SERVICE_INTERFACE_NAME,
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProductsByCategory', () => {
    it('should call the correct method and format the return to DTO', async () => {
      const newProduct = {
        id: 1,
        categoryId: 1,
        name: 'product name',
        productDetails: {
          productSpecificProperty: 'some value',
        },
      };

      const mockService = jest
        .spyOn(mockProductService, 'getProductsByCategories')
        .mockImplementationOnce(async () => [newProduct]);

      const result = await controller.getProductsByCategory({
        categories: [1],
      });

      expect(result).toEqual([new ProductDto(newProduct)]);
      expect(mockService).toHaveBeenCalledTimes(1);
    });
  });
  describe('addProduct', () => {
    it('should call the correct methods to add a new product', async () => {
      const mockCategory = jest
        .spyOn(mockCategoryService, 'getCategoryById')
        .mockImplementation(async () => sampleCategoryConfiguration);

      const mockProduct = jest
        .spyOn(mockProductService, 'addProduct')
        .mockImplementationOnce(async () => sampleProduct);

      const productAsDto = new ProductDto(sampleProduct);

      const result = await controller.addProduct(productAsDto);

      expect(result).toEqual(productAsDto);
      expect(mockCategory).toHaveBeenCalledTimes(2);
      expect(mockCategory).toHaveBeenCalledWith(productAsDto.categoryId);
      expect(mockProduct).toBeCalledTimes(1);
      expect(mockProduct).toHaveBeenCalledWith(sampleProduct);
    });
  });
  describe('deleteProductById', () => {
    it('should call the correct method of product service', async () => {
      const mockProduct = jest
        .spyOn(mockProductService, 'deleteProductById')
        .mockImplementationOnce(async () => undefined);
      const result = await controller.deleteProductById({
        categoryId: 1,
        productId: 1,
      });
      expect(result).toEqual(undefined);
      expect(mockProduct).toHaveBeenCalledTimes(1);
      expect(mockProduct).toHaveBeenCalledWith(1, 1);
    });
  });
  describe('updateProduct', () => {
    it('should call the correct methods to update a product', async () => {
      const mockCategory = jest
        .spyOn(mockCategoryService, 'getCategoryById')
        .mockImplementation(async () => sampleCategoryConfiguration);

      const mockProduct = jest
        .spyOn(mockProductService, 'updateProduct')
        .mockImplementationOnce(async () => sampleProduct);

      const productAsDto = new ProductDto(sampleProduct);

      const result = await controller.updateProduct(
        { categoryId: productAsDto.categoryId, productId: productAsDto.id },
        productAsDto,
      );

      expect(result).toEqual(productAsDto);
      expect(mockCategory).toHaveBeenCalledTimes(2);
      expect(mockCategory).toHaveBeenCalledWith(productAsDto.categoryId);
      expect(mockProduct).toBeCalledTimes(1);
      expect(mockProduct).toHaveBeenCalledWith(sampleProduct);
    });
  });
  describe('checkProductProperties', () => {
    it('id must be a nubmer', async () => {
      const mockCategory = jest.spyOn(mockCategoryService, 'getCategoryById');

      const mockProduct = jest.spyOn(mockProductService, 'updateProduct');

      const productAsDto = new ProductDto(sampleProduct) as any;
      productAsDto.id = 'a';

      try {
        await controller.updateProduct(
          { categoryId: 1, productId: 1 },
          productAsDto,
        );
      } catch (err) {
        expect(err).toBeDefined();
        expect(mockCategory).toHaveBeenCalledTimes(0);
        expect(mockProduct).toHaveBeenCalledTimes(0);
      }
    });
    it('categoryId is mandatory', async () => {
      const mockCategory = jest.spyOn(mockCategoryService, 'getCategoryById');

      const mockProduct = jest.spyOn(mockProductService, 'addProduct');

      const { categoryId, ...productAsDto } = new ProductDto(sampleProduct);

      try {
        await controller.addProduct(productAsDto);
      } catch (err) {
        expect(err).toBeDefined();
        expect(mockCategory).toHaveBeenCalledTimes(0);
        expect(mockProduct).toHaveBeenCalledTimes(0);
      }
    });
    it('categoryId must be a nubmer', async () => {
      const mockCategory = jest.spyOn(mockCategoryService, 'getCategoryById');

      const mockProduct = jest.spyOn(mockProductService, 'addProduct');

      const productAsDto = new ProductDto(sampleProduct) as any;
      productAsDto.categoryId = 'a';

      try {
        await controller.addProduct(productAsDto);
      } catch (err) {
        expect(err).toBeDefined();
        expect(mockCategory).toHaveBeenCalledTimes(0);
        expect(mockProduct).toHaveBeenCalledTimes(0);
      }
    });
    it('name is mandatory', async () => {
      const mockCategory = jest.spyOn(mockCategoryService, 'getCategoryById');

      const mockProduct = jest.spyOn(mockProductService, 'addProduct');

      const { name, ...productAsDto } = new ProductDto(sampleProduct);

      try {
        await controller.addProduct(productAsDto);
      } catch (err) {
        expect(err).toBeDefined();
        expect(mockCategory).toHaveBeenCalledTimes(0);
        expect(mockProduct).toHaveBeenCalledTimes(0);
      }
    });
    it('mandatory property is missing', async () => {
      const mockCategory = jest.spyOn(mockCategoryService, 'getCategoryById');

      const mockProduct = jest.spyOn(mockProductService, 'addProduct');

      const { productDetails, ...newSampleProduct } = sampleProduct;
      const { stringProperty, ...newProductDetail } = productDetails;
      newSampleProduct['productDetails'] = newProductDetail;

      const productAsDto = new ProductDto(newSampleProduct);

      try {
        await controller.addProduct(productAsDto);
      } catch (err) {
        expect(err).toBeDefined();
        expect(mockCategory).toHaveBeenCalledTimes(1);
        expect(mockProduct).toHaveBeenCalledTimes(0);
      }
    });
    it('property has the wrong data type', async () => {
      const mockCategory = jest.spyOn(mockCategoryService, 'getCategoryById');

      const mockProduct = jest.spyOn(mockProductService, 'addProduct');

      const newSampleProduct = JSON.parse(JSON.stringify(sampleProduct));
      newSampleProduct.productDetails.numberProperty = 'abc';

      const productAsDto = new ProductDto(newSampleProduct);

      try {
        await controller.addProduct(productAsDto);
      } catch (err) {
        expect(err).toBeDefined();
        expect(mockCategory).toHaveBeenCalledTimes(1);
        expect(mockProduct).toHaveBeenCalledTimes(0);
      }
    });
    it('missing optional property', async () => {
      const mockCategory = jest
        .spyOn(mockCategoryService, 'getCategoryById')
        .mockImplementation(async () => sampleCategoryConfiguration);

      const mockProduct = jest
        .spyOn(mockProductService, 'addProduct')
        .mockImplementation(async () => sampleProduct);

      const { productDetails, ...newSampleProduct } = sampleProduct;
      const { optionalProperty, ...newProductDetail } = productDetails;
      newSampleProduct['productDetails'] = newProductDetail;

      const productAsDto = new ProductDto(newSampleProduct);

      await controller.addProduct(productAsDto);
      expect(mockCategory).toHaveBeenCalledTimes(2);
      expect(mockProduct).toHaveBeenCalledTimes(1);
    });
  });
  describe('getFavorites', () => {
    it('should return the user favorites', async () => {
      const req = { user: { userId: 1 } };
      const mockFavorite = jest
        .spyOn(mockFavoritesService, 'getFavorites')
        .mockImplementation(async () => {
          return { categoryId: 1, products: [1, 2] };
        });
      const mockProduct = jest
        .spyOn(mockProductService, 'getProductsByCategoriesAndIds')
        .mockImplementation(async () => [sampleProduct]);
      const productAsDto = new ProductDto(sampleProduct);

      const result = await controller.getFavorites(req);

      expect(result).toEqual([productAsDto]);
      expect(mockFavorite).toHaveBeenCalledTimes(1);
      expect(mockFavorite).toHaveBeenCalledWith(req.user.userId);
      expect(mockProduct).toBeCalledTimes(1);
      expect(mockProduct).toHaveBeenCalledWith({
        categoryId: 1,
        products: [1, 2],
      });
    });
  });
  describe('addFavorite', () => {
    it('should call the correct method of the service', async () => {
      const req = { user: { userId: 1 } };
      const categoryId = 2,
        productId = 3;

      const mockFavorite = jest
        .spyOn(mockFavoritesService, 'addFavorite')
        .mockImplementation(async () => undefined);

      const result = await controller.addFavorite(req, {
        categoryId,
        productId,
      });

      expect(result).toEqual(undefined);
      expect(mockFavorite).toHaveBeenCalledTimes(1);
      expect(mockFavorite).toHaveBeenCalledWith(
        req.user.userId,
        categoryId,
        productId,
      );
    });
  });
  describe('deleteFavorite', () => {
    it('should call the correct method of the service', async () => {
      const req = { user: { userId: 1 } };
      const categoryId = 2,
        productId = 3;

      const mockFavorite = jest
        .spyOn(mockFavoritesService, 'deleteFavorite')
        .mockImplementation(async () => undefined);

      const result = await controller.deleteFavorite(req, {
        categoryId,
        productId,
      });

      expect(result).toEqual(undefined);
      expect(mockFavorite).toHaveBeenCalledTimes(1);
      expect(mockFavorite).toHaveBeenCalledWith(
        req.user.userId,
        categoryId,
        productId,
      );
    });
  });
});
