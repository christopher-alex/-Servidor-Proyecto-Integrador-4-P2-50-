import { SchemaFactory } from '@nestjs/mongoose';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ShowtimeDocument = Showtime & Document
@Schema( { timestamps: true, versionKey: false })
export class Showtime {
  @Prop()
  code: string;
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Movie' })
  movie: string;
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Cinema' })
  cinema: string;
  @Prop()
  date: Date;
  @Prop()
  time: Date;
  @Prop()
  available_seats: number;
  
}

export const ShowtimeSchema = SchemaFactory.createForClass(Showtime);

