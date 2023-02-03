import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bookings, BookingsSchema } from './schema/bookings.schema';
import { User, UserSchema } from 'src/users/schema/users.schema';
import { Movie, MovieSchema } from 'src/movies/schema/movies.schema';
import { Cinema, CinemaSchema } from 'src/cinemas/schema/cinema.schema';
import { TicketType, TicketTypeSchema } from 'src/ticket_types/schema/ticket_types.schema';
import { Product, ProductSchema } from 'src/products/schemas/products.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bookings.name, schema: BookingsSchema },
      { name: User.name, schema: UserSchema },
      { name: Movie.name, schema: MovieSchema },
      { name: Cinema.name, schema: CinemaSchema },
      { name: TicketType.name, schema: TicketTypeSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
