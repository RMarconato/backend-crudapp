export interface ICategoryDTO {
  id: number;
  name: string;
}

export class CategoryDTO implements ICategoryDTO {
  id: number;
  name: string;
  constructor(category: ICategoryDTO) {
    this.id = category.id;
    this.name = category.name;
  }
}
