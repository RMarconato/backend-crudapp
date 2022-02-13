export interface ICategoryDTO {
  id: string;
  name: string;
}

export class CategoryDTO implements ICategoryDTO {
  id: string;
  name: string;
  constructor(category: ICategoryDTO) {
    this.id = category.id;
    this.name = category.name;
  }
}
