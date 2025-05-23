import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, MongooseModule.forFeature([
    {name: Product.name, schema: ProductSchema}
  ])],
  controllers: [ProductController],
  providers: [ProductService, JwtModule],
  exports: [MongooseModule]
})
export class ProductModule {}
