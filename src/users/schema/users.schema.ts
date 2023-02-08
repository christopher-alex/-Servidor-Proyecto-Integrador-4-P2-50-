import { SchemaFactory } from '@nestjs/mongoose';
import { Prop } from '@nestjs/mongoose/dist/decorators';
import { Schema } from '@nestjs/mongoose/dist/decorators/schema.decorator';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema( { timestamps: true, versionKey: false } )
export class User {
  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({default: "client"})
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
