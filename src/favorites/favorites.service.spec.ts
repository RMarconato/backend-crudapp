import { Test, TestingModule } from '@nestjs/testing';
import IFavoriteRepository, {
  FAVORITE_REPOSITORY_INTERFACE_NAME,
} from './favorites.interface.repository';
import { FavoriteItemModel, FavoriteModel } from './favorites.model';
import { FavoritesService } from './favorites.service';

const mockFavoritesRepository: IFavoriteRepository = {
  add: jest.fn(),
  delete: jest.fn(),
  getUserFavorites: jest.fn(),
};

describe('FavoriteService', () => {
  let service: FavoritesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        {
          provide: FAVORITE_REPOSITORY_INTERFACE_NAME,
          useValue: mockFavoritesRepository,
        },
      ],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addFavorite', () => {
    it('should call repository method and return its value', async () => {
      const userId = 1,
        categoryId = 1,
        productId = 1;

      const mockFavorite = new FavoriteModel({
        userId,
        favorites: [{ categoryId, products: [productId] }],
      });
      const mockedAdd = jest
        .spyOn(mockFavoritesRepository, 'add')
        .mockImplementation(async () => mockFavorite);

      const result = await service.addFavorite(userId, categoryId, productId);

      expect(result).toEqual(mockFavorite);
      expect(mockedAdd).toHaveBeenCalledTimes(1);
      expect(mockedAdd).toHaveBeenCalledWith(userId, categoryId, productId);
    });

    it('should not block repository errors', async () => {
      const userId = 1,
        categoryId = 1,
        productId = 1;

      const mockedAdd = jest
        .spyOn(mockFavoritesRepository, 'add')
        .mockRejectedValueOnce(() => {
          throw new Error('just some error');
        });

      try {
        await service.addFavorite(userId, categoryId, productId);
      } catch (err) {
        expect(err).toBeTruthy();
        expect(mockedAdd).toHaveBeenCalledTimes(1);
        expect(mockedAdd).toHaveBeenCalledWith(userId, categoryId, productId);
      }
    });
  });

  describe('deleteFavorite', () => {
    it('should call repository method and return its value', async () => {
      const userId = 1,
        categoryId = 1,
        productId = 1;

      const mockFavorite = new FavoriteModel({
        userId,
        favorites: [{ categoryId, products: [productId] }],
      });
      const mockedDelete = jest
        .spyOn(mockFavoritesRepository, 'delete')
        .mockImplementation(async () => mockFavorite);

      const result = await service.deleteFavorite(
        userId,
        categoryId,
        productId,
      );

      expect(result).toEqual(mockFavorite);
      expect(mockedDelete).toHaveBeenCalledTimes(1);
      expect(mockedDelete).toHaveBeenCalledWith(userId, categoryId, productId);
    });

    it('should not block repository errors', async () => {
      const userId = 1,
        categoryId = 1,
        productId = 1;

      const mockedDelete = jest
        .spyOn(mockFavoritesRepository, 'delete')
        .mockRejectedValueOnce(() => {
          throw new Error('just some error');
        });

      try {
        await service.deleteFavorite(userId, categoryId, productId);
      } catch (err) {
        expect(err).toBeTruthy();
        expect(mockedDelete).toHaveBeenCalledTimes(1);
        expect(mockedDelete).toHaveBeenCalledWith(
          userId,
          categoryId,
          productId,
        );
      }
    });
  });

  describe('getUserFavorites', () => {
    it('should call repository method and return its value', async () => {
      const userId = 1,
        categoryId = 1,
        productId = 1;

      const mockUserFavorites = [
        new FavoriteItemModel({
          categoryId,
          products: [productId],
        }),
      ];

      const mockedGetUserFavorites = jest
        .spyOn(mockFavoritesRepository, 'getUserFavorites')
        .mockImplementation(async () => mockUserFavorites);

      const result = await service.getFavorites(userId);

      expect(result).toEqual(mockUserFavorites);
      expect(mockedGetUserFavorites).toHaveBeenCalledTimes(1);
      expect(mockedGetUserFavorites).toHaveBeenCalledWith(userId);
    });

    it('should not block repository errors', async () => {
      const userId = 1;

      const mockedGetUserFavorites = jest
        .spyOn(mockFavoritesRepository, 'getUserFavorites')
        .mockRejectedValueOnce(() => {
          throw new Error('just some error');
        });

      try {
        await service.getFavorites(userId);
      } catch (err) {
        expect(err).toBeTruthy();
        expect(mockedGetUserFavorites).toHaveBeenCalledTimes(1);
        expect(mockedGetUserFavorites).toHaveBeenCalledWith(userId);
      }
    });
  });
});
