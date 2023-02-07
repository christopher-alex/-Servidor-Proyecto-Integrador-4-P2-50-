import { SchemaFactory } from '@nestjs/mongoose';
import { Prop, Schema } from '@nestjs/mongoose/dist/decorators';

import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true, versionKey: false })
export class Product {
  @Prop()
  name: string;
  @Prop()
  price: number;
  @Prop()
  description: string;
  @Prop()
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
