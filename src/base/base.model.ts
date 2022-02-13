export interface IBaseModel {
  id: string;
}

export class BaseModel implements IBaseModel {
  id: string;
  constructor(id: string) {
    this.id = id;
  }
}
