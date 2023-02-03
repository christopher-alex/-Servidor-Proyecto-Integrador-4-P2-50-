import { SchemaFactory } from '@nestjs/mongoose';
import { Prop } from '@nestjs/mongoose/dist/decorators';
import { Schema } from '@nestjs/mongoose/dist/decorators/schema.decorator';
import { Document } from 'mongoose';


export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  
  
}


export const UserSchema = SchemaFactory.createForClass(User);