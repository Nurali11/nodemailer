import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, mongo, Mongoose } from "mongoose";
import { User } from "src/user/entities/user.entity";

export type ProductDocument = HydratedDocument<Product>

@Schema()
export class Product {
  @Prop()
  name: string

  @Prop()
  price: number

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: User.name})
  userId: mongoose.Types.ObjectId
}

export const ProductSchema = SchemaFactory.createForClass(Product)