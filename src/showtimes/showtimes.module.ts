import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cinema, CinemaSchema } from 'src/cinemas/schema/cinema.schema';
import { Movie, MovieSchema } from 'src/movies/schema/movies.schema';
import { ShowTime, ShowTimeSchema } from './schema/showtimes.schema';
import { ShowTimesController } from './showtimes.controller';
import { ShowtimeService } from './showtimes.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShowTime.name, schema: ShowTimeSchema },
      { name: Cinema.name, schema: CinemaSchema },
      { name: Movie.name, schema: MovieSchema },]),
  ],
  controllers: [ShowTimesController],
  providers: [ShowtimeService]
})
export class ShowTimesModule {}
