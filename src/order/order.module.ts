import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [UserModule, ProductModule,MongooseModule.forFeature([
    {name: Order.name, schema: OrderSchema}
  ])],
  controllers: [OrderController],
  providers: [OrderService, MailService],
})
export class OrderModule {}
