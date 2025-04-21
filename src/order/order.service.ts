import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { Request } from 'express';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private order: Model<Order>,
    @InjectModel(User.name) private user: Model<User>,
    @InjectModel(Product.name) private product: Model<Product>,
    private mailer: MailService
  ){}
  async create(data: CreateOrderDto, req: Request) {
    try {
      console.log('f', req['user'].id);
      const user: any = await this.user.findById(req['user'].id)
      
      const product: any = await this.product.findById(data.productId)
  
      let newOrder = await this.order.create({
        count: data.count,
        productId: data.productId,
        userId: req['user'].id
      })
      await this.mailer.sendMail(user.email, 'Order created', `
        Product name: ${product.name}\n
        Count: ${data.count}\n
        Total cost: ${product.price * data.count}
        `)
  
        return newOrder
    } catch (error) {
      return error.message
    }
  }

  async findAll() {
    try {
      let orders = await this.order.find()
      return orders
    } catch (error) {
      return error.message
    }
  }

  async my_orders(req: Request){
    try {
      let order = await this.order.find({ userId: req })
      return order
    } catch (error) {
      return error.message
    }
  }

  async findOne(id: string) {
    try {
      let order = await this.order.findById(id)
      return order
    } catch (error) {
      return error.message
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      let updatedOrder = await this.order.findByIdAndUpdate(id, updateOrderDto, {new: true})
      return updatedOrder
    } catch (error) {
      return error.message
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.order.findByIdAndDelete(id)
      return deleted 
    } catch (error) {
      return error.message
    }
  }
}
