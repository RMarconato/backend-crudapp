import { BaseModel } from './base.model';

describe('BaseModel', () => {
  it('should create an entity from the model', () => {
    const newBaseObject = new BaseModel(999);

    expect(newBaseObject).toBeDefined();
    expect(Object.keys(newBaseObject)).toHaveLength(1);
  });
});
