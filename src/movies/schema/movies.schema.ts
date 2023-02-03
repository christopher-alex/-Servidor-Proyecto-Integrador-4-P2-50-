import { SchemaFactory } from '@nestjs/mongoose';
import { Prop, Schema } from '@nestjs/mongoose/dist/decorators';

import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema({ timestamps: true })
export class Movie {
  @Prop()
  title: string;
  @Prop()
  year: number;
  @Prop()
  duration: number;
  @Prop()
  trailer: string;
  @Prop()
  backdrop: string;
  @Prop()
  poster: string;
  @Prop()
  synopsis: string;
  @Prop()
  genre: string;
  @Prop()
  directors: string;
  @Prop()
  actors: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);