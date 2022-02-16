import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import mockCategories from './categories.json';
import { CategoryModel } from './category.model';
import { NotFoundException } from '@nestjs/common';

const categories = mockCategories.map(
  (category) => new CategoryModel(category),
);

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllCategories', () => {
    it('should return all categories', async () => {
      const ret = await service.getAllCategories();
      expect(ret).toEqual(categories);
    });
  });

  describe('getCategoryById', () => {
    it('should return return the correct category', async () => {
      const testCategory = categories[0];
      const ret = await service.getCategoryById(testCategory.id);
      expect(ret).toEqual(testCategory);
    });

    it('should throw not found', async () => {
      const expectedError = new NotFoundException(
        `Category ${-1} does not exists`,
      );

      let error;
      try {
        await service.getCategoryById(-1);
      } catch (e) {
        error = e;
      }

      expect(error).toBeTruthy();
      expect(error).toEqual(expectedError);
    });
  });
});
