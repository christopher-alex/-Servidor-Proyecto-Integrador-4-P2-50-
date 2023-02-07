import { SchemaFactory } from '@nestjs/mongoose';
import { Prop, Schema } from '@nestjs/mongoose/dist/decorators';

import { Document } from 'mongoose';

export type CinemaDocument = Cinema & Document;

@Schema({ timestamps: true, versionKey: false })
export class Cinema {
  @Prop()
  name: string;
  @Prop()
  image: string;
  @Prop([
    {
      row: String,
      seats: Number,
      seats_available: [],
    },
  ])
  seating_capacity: [];
}

export const CinemaSchema = SchemaFactory.createForClass(Cinema);
