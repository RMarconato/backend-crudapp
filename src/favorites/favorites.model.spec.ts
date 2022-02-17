import { FavoriteItemModel, FavoriteModel } from './favorites.model';

describe('FavoriteModel', () => {
  it('FavoriteItemModel, should create an entity', () => {
    const categoryId = 1,
      productId = 1;

    const sampleFavoriteItemModel = {
      categoryId,
      products: [productId],
    };

    const newFavoriteItemModel = new FavoriteItemModel(sampleFavoriteItemModel);

    expect(newFavoriteItemModel).toBeDefined();
    expect(Object.keys(newFavoriteItemModel)).toHaveLength(2);
  });

  it('FavoriteModel, should create an entity', () => {
    const userId = 1,
      categoryId = 1,
      productId = 1;

    const sampleFavoriteItemModel = {
      categoryId,
      products: [productId],
    };

    const sampleFavoriteModel = {
      userId,
      favorites: [sampleFavoriteItemModel],
    };

    const newFavoriteModel = new FavoriteModel(sampleFavoriteModel);

    expect(newFavoriteModel).toBeDefined();
    expect(Object.keys(newFavoriteModel)).toHaveLength(2);
  });
});
