import { Module } from '@nestjs/common';
import { MovieService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie } from './entities/movie.entity';
import { MovieSchema } from './schema/movies.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
  ],
  controllers: [MoviesController],
  providers: [MovieService]
})
export class MoviesModule {}
