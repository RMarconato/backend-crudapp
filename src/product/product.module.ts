import { Module } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { ProductController } from './product.controller';
import ProductDaRepository from './product.da.repository';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductDaRepository, CategoryService],
})
export class ProductModule {}
