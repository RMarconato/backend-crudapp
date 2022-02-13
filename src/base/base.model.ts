export interface IBaseModel {
  id: number;
}

export class BaseModel implements IBaseModel {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
}
