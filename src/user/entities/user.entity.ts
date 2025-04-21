import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    @Prop()
    username: string

    @Prop()
    password: string

    @Prop()
    email: string

    @Prop({default: "USER"})
    role: string

    @Prop({default: 'unverified'})
    status: string
}

export const UserSchema = SchemaFactory.createForClass(User)