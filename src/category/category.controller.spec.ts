import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CATEGORY_SERVICE_NAME } from './category.service';
import categories from './categories.json';

let controller: CategoryController;
const mockCategoryService = {
  getAllCategories: jest.fn(),
};

describe('CategoryController', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CATEGORY_SERVICE_NAME,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAllCategories should call the correct service method', async () => {
    const mockCategoryServiceCall = jest
      .spyOn(mockCategoryService, 'getAllCategories')
      .mockImplementation(() => {
        return categories;
      });
    await controller.getAllCategories();
    expect(mockCategoryServiceCall).toHaveBeenCalledTimes(1);
  });
});
