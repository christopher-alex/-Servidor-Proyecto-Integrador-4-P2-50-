import { SchemaFactory } from '@nestjs/mongoose';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';


export type BookingsDocument = Bookings & Document;

@Schema({ timestamps: true, versionKey: false})
export class Bookings {
  @Prop()
  date: Date;

  @Prop()
  code: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'User',
  })
  user: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Movie' })
  movie: string;
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Cinema' })
  cinema: string;
  @Prop([{ type: mongoose.Types.ObjectId, ref: 'Ticket' }])
  ticketType: string;
  @Prop([{ type: mongoose.Types.ObjectId, ref: 'Product' }])
  product: string;
}

export const BookingsSchema = SchemaFactory.createForClass(Bookings);
