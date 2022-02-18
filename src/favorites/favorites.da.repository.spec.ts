import { Test, TestingModule } from '@nestjs/testing';
import FavoritesDaRepository from './favorites.da.repository';

describe('FavoriteRepository', () => {
  let repository: FavoritesDaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoritesDaRepository],
    }).compile();

    repository = module.get<FavoritesDaRepository>(FavoritesDaRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('add', () => {
    it('should create a new entry on favorites', async () => {
      const mockData = {
        userId: 1,
        favorites: [
          {
            categoryId: 1,
            products: [1],
          },
        ],
      };
      const { userId } = mockData;
      const { categoryId } = mockData.favorites[0];
      const productId = mockData.favorites[0].products[0];

      const result = await repository.add(userId, categoryId, productId);
      expect(result).toEqual(mockData);
    });

    it('should add an entry in an existing category', async () => {
      const userId = 1;
      const categoryId = 1;
      const firstProductId = 1;
      const secondProductId = 2;

      const addedFirstProduct = await repository.add(
        userId,
        categoryId,
        firstProductId,
      );
      expect(addedFirstProduct).toEqual({
        userId: 1,
        favorites: [
          {
            categoryId: 1,
            products: [1],
          },
        ],
      });

      const addedSecondProduct = await repository.add(
        userId,
        categoryId,
        secondProductId,
      );
      expect(addedSecondProduct).toEqual({
        userId: 1,
        favorites: [
          {
            categoryId: 1,
            products: [1, 2],
          },
        ],
      });
    });

    it('should should not duplicate an entry', async () => {
      const mockData = {
        userId: 1,
        favorites: [
          {
            categoryId: 1,
            products: [1],
          },
        ],
      };
      const { userId } = mockData;
      const { categoryId } = mockData.favorites[0];
      const productId = mockData.favorites[0].products[0];

      const result = await repository.add(userId, categoryId, productId);
      expect(result).toEqual(mockData);

      const secondCall = await repository.add(userId, categoryId, productId);
      expect(secondCall).toEqual(mockData);
    });

    it('should add a second category', async () => {
      const userId = 1;
      const firstCategoryId = 1;
      const secondCategoryId = 2;
      const productId = 1;

      const addedFirstProduct = await repository.add(
        userId,
        firstCategoryId,
        productId,
      );
      expect(addedFirstProduct).toEqual({
        userId: 1,
        favorites: [
          {
            categoryId: 1,
            products: [1],
          },
        ],
      });

      const addedSecondProduct = await repository.add(
        userId,
        secondCategoryId,
        productId,
      );
      expect(addedSecondProduct).toEqual({
        userId: 1,
        favorites: [
          {
            categoryId: 1,
            products: [1],
          },
          {
            categoryId: 2,
            products: [1],
          },
        ],
      });
    });
  });

  describe('delete', () => {
    it('should delete an existing entry', async () => {
      const userId = 1;
      const categoryId = 1;
      const firstProductId = 1;
      const secondProductId = 2;

      await repository.add(userId, categoryId, firstProductId);
      const favoriteWithTwoEntries = await repository.add(
        userId,
        categoryId,
        secondProductId,
      );
      expect(favoriteWithTwoEntries).toEqual({
        userId: 1,
        favorites: [
          {
            categoryId: 1,
            products: [1, 2],
          },
        ],
      });

      const result = await repository.delete(
        userId,
        categoryId,
        firstProductId,
      );

      expect(result).toEqual({
        userId: 1,
        favorites: [
          {
            categoryId: 1,
            products: [2],
          },
        ],
      });
    });

    it('should return undefined if the entry does not exists', async () => {
      const userId = 1;
      const categoryId = 1;
      const productId = 2;

      const withoutCategory = await repository.delete(1, 1, 1);
      expect(withoutCategory).toEqual(undefined);

      await repository.add(userId, categoryId, productId);
      const withCategory = await repository.delete(1, 1, 1);
      expect(withCategory).toEqual(undefined);
    });
  });

  describe('getUserFavorites', () => {
    it('should return the favorites of a user', async () => {
      const userId = 1;
      await repository.add(userId, 1, 1);
      await repository.add(userId, 1, 2);
      await repository.add(2, 1, 2);
      const result = await repository.getUserFavorites(userId);
      expect(result).toEqual([
        {
          categoryId: 1,
          products: [1, 2],
        },
      ]);
    });

    it('should return nothing if the user does not have any favorites', async () => {
      const userId = 1;
      const result = await repository.getUserFavorites(userId);
      expect(result).toEqual(undefined);
    });
  });
});
