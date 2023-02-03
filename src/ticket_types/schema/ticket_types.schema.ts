import { SchemaFactory } from '@nestjs/mongoose';
import { Prop, Schema } from '@nestjs/mongoose/dist/decorators';

import { Document } from 'mongoose';


export type TicketTypeDocument = TicketType & Document;

@Schema({ timestamps: true, versionKey: false})
export class TicketType {
  @Prop()
  type: string;
  @Prop()
  price: number;
 
}

export const TicketTypeSchema = SchemaFactory.createForClass(TicketType);
