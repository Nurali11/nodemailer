import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { Request } from 'express';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private product: Model<Product>
  ){}
  async create(data: CreateProductDto, req: Request) {
    let newProduct = await this.product.create({
      name: data.name,
      price: data.price,
      userId: req['user'].id
    });
    return newProduct;
  }

  async findAll() {
    return await this.product.find().populate('userId')
  }

  async findOne(id: string) {
    let product = await this.product.findById(id).populate('userId')
    if (!product) {
      return 'Product not found';
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto, req: Request) {
    let product = await this.product.findByIdAndUpdate(id, updateProductDto, {new: true})
    if (!product) {
      return 'Product not found';
    }
    return product;
  }

  async remove(id: string, req: Request) {
    let product = await this.product.findByIdAndDelete(id)
    if (!product) {
      return 'Product not found';
    }
    return product;
  }
}
