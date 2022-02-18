import { Test, TestingModule } from '@nestjs/testing';
import IProductRepository, {
  PRODUCT_REPOSITORY_INTERFACE_NAME,
} from './product.interface.repository';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';

const mockProductRepository: IProductRepository = {
  getProductsByCategories: jest.fn(),
  getProductsByCategoriesAndIds: jest.fn(),
  add: jest.fn(),
  delete: jest.fn(),
};

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PRODUCT_REPOSITORY_INTERFACE_NAME,
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getProductsByCategories', () => {
    it('should call repository method and return its value', async () => {
      const categories = [{ id: 1 }];

      const mockReturn = [
        {
          id: 1,
          categoryId: 1,
          name: 'ração canina tipo 1',
          productDetails: {
            description: 'ração animal balanceada para cachorros adultos',
            price: 130.5,
            expirationTime: '12 meses',
          },
        },
        {
          id: 2,
          categoryId: 1,
          name: 'Vasilha para comida',
          productDetails: {
            price: 40,
          },
        },
      ];

      const mockRepository = jest
        .spyOn(mockProductRepository, 'getProductsByCategories')
        .mockImplementationOnce(async () => mockReturn);

      const result = await service.getProductsByCategories(categories);

      expect(result).toEqual(mockReturn);
      expect(mockRepository).toHaveBeenCalledTimes(1);
      expect(mockRepository).toHaveBeenCalledWith(categories);
    });
    it('should not block repository errors', async () => {
      const categories = [{ id: 1 }];

      const mockRepository = jest
        .spyOn(mockProductRepository, 'getProductsByCategories')
        .mockRejectedValueOnce(() => {
          throw new Error('just some error');
        });

      try {
        await service.getProductsByCategories(categories);
      } catch (err) {
        expect(err).toBeTruthy();
        expect(mockRepository).toHaveBeenCalledTimes(1);
        expect(mockRepository).toHaveBeenCalledWith(categories);
      }
    });
  });
  describe('getProductsByCategoriesAndIds', () => {
    it('should call repository method and return its value', async () => {
      const filter = [{ categoryId: 1, products: [1, 2] }];

      const mockReturn = [
        {
          id: 1,
          categoryId: 1,
          name: 'ração canina tipo 1',
          productDetails: {
            description: 'ração animal balanceada para cachorros adultos',
            price: 130.5,
            expirationTime: '12 meses',
          },
        },
        {
          id: 2,
          categoryId: 1,
          name: 'Vasilha para comida',
          productDetails: {
            price: 40,
          },
        },
      ];

      const mockRepository = jest
        .spyOn(mockProductRepository, 'getProductsByCategoriesAndIds')
        .mockImplementationOnce(async () => mockReturn);

      const result = await service.getProductsByCategoriesAndIds(filter);

      expect(result).toEqual(mockReturn);
      expect(mockRepository).toHaveBeenCalledTimes(1);
      expect(mockRepository).toHaveBeenCalledWith(filter);
    });
    it('should not block repository errors', async () => {
      const filter = [{ categoryId: 1, products: [1, 2] }];

      const mockRepository = jest
        .spyOn(mockProductRepository, 'getProductsByCategoriesAndIds')
        .mockRejectedValueOnce(() => {
          throw new Error('just some error');
        });

      try {
        await service.getProductsByCategoriesAndIds(filter);
      } catch (err) {
        expect(err).toBeTruthy();
        expect(mockRepository).toHaveBeenCalledTimes(1);
        expect(mockRepository).toHaveBeenCalledWith(filter);
      }
    });
  });
  describe('addProduct', () => {
    it('should call repository method and return its value', async () => {
      const newProduct: ProductModel = {
        id: 1,
        categoryId: 1,
        name: 'product name',
        productDetails: {
          productSpecificProperty: 'some value',
        },
      };

      const mockRepository = jest
        .spyOn(mockProductRepository, 'add')
        .mockImplementationOnce(async () => newProduct);

      const result = await service.addProduct(newProduct);
      expect(result).toEqual(newProduct);
      expect(mockRepository).toHaveBeenCalledTimes(1);
      expect(mockRepository).toHaveBeenCalledWith(newProduct, true);
    });
    it('should not block repository errors', async () => {
      const newProduct: ProductModel = {
        id: 1,
        categoryId: 1,
        name: 'product name',
        productDetails: {
          productSpecificProperty: 'some value',
        },
      };

      const mockRepository = jest
        .spyOn(mockProductRepository, 'add')
        .mockRejectedValueOnce(() => {
          throw new Error('just some error');
        });

      try {
        await service.addProduct(newProduct);
      } catch (err) {
        expect(err).toBeTruthy();
        expect(mockRepository).toHaveBeenCalledTimes(1);
        expect(mockRepository).toHaveBeenCalledWith(newProduct, true);
      }
    });
  });
  describe('deleteProductById', () => {
    it('should call repository method and return its value', async () => {
      const categoryId = 1,
        productId = 1;

      const mockRepository = jest
        .spyOn(mockProductRepository, 'delete')
        .mockImplementationOnce(async () => {
          return true;
        });

      const result = await service.deleteProductById(categoryId, productId);
      expect(result).toEqual(undefined);
      expect(mockRepository).toHaveBeenCalledTimes(1);
      expect(mockRepository).toHaveBeenCalledWith(categoryId, productId);
    });
    it('should not block repository errors', async () => {
      const categoryId = 1,
        productId = 1;

      const mockRepository = jest
        .spyOn(mockProductRepository, 'delete')
        .mockRejectedValueOnce(() => {
          throw new Error('just some error');
        });

      try {
        await service.deleteProductById(categoryId, productId);
      } catch (err) {
        expect(err).toBeTruthy();
        expect(mockRepository).toHaveBeenCalledTimes(1);
        expect(mockRepository).toHaveBeenCalledWith(categoryId, productId);
      }
    });
    it('should thrown an error if repository returns false', async () => {
      const categoryId = 1,
        productId = 1;

      const mockRepository = jest
        .spyOn(mockProductRepository, 'delete')
        .mockImplementationOnce(async () => {
          return false;
        });

      try {
        await service.deleteProductById(categoryId, productId);
      } catch (err) {
        expect(err).toBeTruthy();
        expect(mockRepository).toHaveBeenCalledTimes(1);
        expect(mockRepository).toHaveBeenCalledWith(categoryId, productId);
      }
    });
  });
  describe('updateProduct', () => {
    it('should call repository the correct methods', async () => {
      const newProduct: ProductModel = {
        id: 1,
        categoryId: 1,
        name: 'product name',
        productDetails: {
          productSpecificProperty: 'some value',
        },
      };

      const mockRepositoryDelete = jest
        .spyOn(mockProductRepository, 'delete')
        .mockImplementationOnce(async () => {
          return true;
        });
      const mockRepositoryAdd = jest
        .spyOn(mockProductRepository, 'add')
        .mockImplementationOnce(async () => newProduct);

      const result = await service.updateProduct(newProduct);
      expect(result).toEqual(newProduct);
      expect(mockRepositoryDelete).toHaveBeenCalledTimes(1);
      expect(mockRepositoryAdd).toHaveBeenCalledTimes(1);
      expect(mockRepositoryDelete).toHaveBeenCalledWith(
        newProduct.categoryId,
        newProduct.id,
      );
      expect(mockRepositoryAdd).toHaveBeenCalledWith(newProduct, false);
    });
    it('should not block repository errors on delete method', async () => {
      const newProduct: ProductModel = {
        id: 1,
        categoryId: 1,
        name: 'product name',
        productDetails: {
          productSpecificProperty: 'some value',
        },
      };

      const mockRepositoryDelete = jest
        .spyOn(mockProductRepository, 'delete')
        .mockRejectedValueOnce(() => {
          throw new Error('just some error');
        });
      const mockRepositoryAdd = jest
        .spyOn(mockProductRepository, 'add')
        .mockImplementationOnce(async () => newProduct);

      try {
        await service.updateProduct(newProduct);
      } catch (err) {
        expect(err).toBeTruthy();
        expect(mockRepositoryDelete).toHaveBeenCalledTimes(1);
        expect(mockRepositoryDelete).toHaveBeenCalledWith(
          newProduct.categoryId,
          newProduct.id,
        );
        expect(mockRepositoryAdd).not.toHaveBeenCalled();
      }
    });
    it('should not block repository errors on add method', async () => {
      const newProduct: ProductModel = {
        id: 1,
        categoryId: 1,
        name: 'product name',
        productDetails: {
          productSpecificProperty: 'some value',
        },
      };

      const mockRepositoryDelete = jest
        .spyOn(mockProductRepository, 'delete')
        .mockImplementationOnce(async () => {
          return true;
        });
      const mockRepositoryAdd = jest
        .spyOn(mockProductRepository, 'add')
        .mockRejectedValueOnce(() => {
          throw new Error('just some error');
        });

      try {
        await service.updateProduct(newProduct);
      } catch (err) {
        expect(err).toBeTruthy();
        expect(mockRepositoryDelete).toHaveBeenCalledTimes(1);
        expect(mockRepositoryDelete).toHaveBeenCalledWith(
          newProduct.categoryId,
          newProduct.id,
        );
        expect(mockRepositoryAdd).toHaveBeenCalledTimes(1);
        expect(mockRepositoryAdd).toHaveBeenCalledWith(newProduct, false);
      }
    });
    it('should thrown an error if repository returns false', async () => {
      const newProduct: ProductModel = {
        id: 1,
        categoryId: 1,
        name: 'product name',
        productDetails: {
          productSpecificProperty: 'some value',
        },
      };

      const mockRepositoryDelete = jest
        .spyOn(mockProductRepository, 'delete')
        .mockImplementationOnce(async () => {
          return false;
        });
      const mockRepositoryAdd = jest
        .spyOn(mockProductRepository, 'add')
        .mockImplementationOnce(async () => newProduct);

      try {
        await service.updateProduct(newProduct);
      } catch (err) {
        expect(err).toBeTruthy();
        expect(mockRepositoryDelete).toHaveBeenCalledTimes(1);
        expect(mockRepositoryDelete).toHaveBeenCalledWith(
          newProduct.categoryId,
          newProduct.id,
        );
        expect(mockRepositoryAdd).not.toHaveBeenCalled();
      }
    });
  });
});
