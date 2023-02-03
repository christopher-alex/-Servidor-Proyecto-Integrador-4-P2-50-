import { SchemaFactory } from '@nestjs/mongoose';
import { Prop, Schema } from '@nestjs/mongoose/dist/decorators';

import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true, versionKey: false})
export class Product {
  @Prop()
  product_id: string;
  @Prop()
  name: string;
  @Prop()
  price: number;
  
}

export const ProductSchema = SchemaFactory.createForClass(Product);
