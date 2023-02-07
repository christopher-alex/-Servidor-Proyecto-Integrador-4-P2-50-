import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cinema, CinemaSchema } from 'src/cinemas/schema/cinema.schema';
import { Movie, MovieSchema } from 'src/movies/schema/movies.schema';
import { Showtime, ShowtimeSchema } from './schema/showtimes.schema';
import { ShowtimesController } from './showtimes.controller';
import { ShowtimeService } from './showtimes.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Showtime.name, schema: ShowtimeSchema },
      { name: Cinema.name, schema: CinemaSchema },
      { name: Movie.name, schema: MovieSchema },]),
  ],
  controllers: [ShowtimesController],
  providers: [ShowtimeService]
})
export class ShowtimesModule {}
