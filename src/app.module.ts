import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MailService } from './mail/mail.service';
import { SmsService } from './sms/sms.service';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UserModule, ProductModule, OrderModule,
    MongooseModule.forRoot('mongodb://localhost/uy_ishi')
  ],
  controllers: [AppController],
  providers: [AppService, MailService, SmsService],
})
export class AppModule {}
