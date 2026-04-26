import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UserRole } from "../enums/user-role.enum";


export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {

    @Prop({ required: true, })
    name: string

    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    password: string

    @Prop({ required: true, enum: UserRole, default: UserRole.USER })
    role: UserRole

    @Prop({ default: true })
    isActive: true
}

export const UserSchema = SchemaFactory.createForClass(User)