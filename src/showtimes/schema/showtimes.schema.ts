import { SchemaFactory } from '@nestjs/mongoose';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ShowTimeDocument = ShowTime & Document
@Schema()
export class ShowTime {
  @Prop()
  code: string;
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Movie' })
  movie: string;
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Cinema' })
  cinema: string;
  @Prop()
  date: Date;
  @Prop()
  time: number;
  @Prop()
  available_seats: [];
  @Prop()
  contentRating: string;
  @Prop()
  source: string;
  @Prop()
  tags: string[];
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}

export const ShowTimeSchema = SchemaFactory.createForClass(ShowTime);
ShowTimeSchema.pre('save', function (next) {
  const showTime = this as ShowTimeDocument;
  if (!showTime.createdAt) {
    showTime.createdAt = new Date();
  }
  showTime.updatedAt = new Date();
  next();
});
