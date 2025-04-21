import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Mongoose } from "mongoose";
import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";

export type OrderDocument = HydratedDocument<Order>

@Schema()
export class Order {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: Product.name})
    productId: mongoose.Types.ObjectId

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: User.name})
    userId: mongoose.Types.ObjectId

    @Prop()
    count: number
}

export const OrderSchema = SchemaFactory.createForClass(Order)