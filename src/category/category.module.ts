import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CATEGORY_SERVICE_INTERFACE_NAME } from './category.interface.service';

const injectors = [
  {
    provide: CATEGORY_SERVICE_INTERFACE_NAME,
    useClass: CategoryService,
  },
];
@Module({
  controllers: [CategoryController],
  providers: injectors,
  exports: injectors,
})
export class CategoryModule {}
