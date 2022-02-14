export interface ICategoryDto {
  id: number;
  name: string;
}

export class CategoryDto implements ICategoryDto {
  id: number;
  name: string;
  constructor(category: ICategoryDto) {
    this.id = category.id;
    this.name = category.name;
  }
}
