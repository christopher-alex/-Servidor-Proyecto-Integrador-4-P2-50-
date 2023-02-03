import { SchemaFactory } from '@nestjs/mongoose';
import { Prop, Schema } from '@nestjs/mongoose/dist/decorators';

import { Document } from 'mongoose';

export type CinemaDocument = Cinema & Document;

@Schema({ timestamps: true, versionKey: false })
export class Cinema {
  
  @Prop()
  cinema_id: string;
  @Prop()
  name: string;
  @Prop( [ { row: String, seats: Number } ] )
  seating_capacity: [];
}

export const CinemaSchema = SchemaFactory.createForClass(Cinema);

