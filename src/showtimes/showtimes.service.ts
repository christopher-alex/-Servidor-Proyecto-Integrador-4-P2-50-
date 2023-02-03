import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateShowtimeDto } from './dto/create-showtime.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cinema, CinemaDocument } from 'src/cinemas/schema/cinema.schema';
import { Movie, MovieDocument } from 'src/movies/schema/movies.schema';
import { ShowTime, ShowTimeDocument } from './schema/showtimes.schema';

@Injectable()
export class ShowtimeService {
  constructor(
    @InjectModel(ShowTime.name)
    private readonly showTimeModel: Model<ShowTimeDocument>,

    @InjectModel(Movie.name)
    private readonly movieModel: Model<MovieDocument>,

    @InjectModel(Cinema.name)
    private readonly cinemaModel: Model<CinemaDocument>,
  ) {}
  async create(createBookingDto: CreateShowtimeDto, req: any) {
    const [movie, cinema] = await Promise.all([
      this.movieModel.findById(req.movie_id),

      this.cinemaModel.findById(req.cinema_id),
    ]);

    const entities = [
      { variable: movie, message: 'Movie not found MMV' },

      { variable: cinema, message: 'Cinema not found' },
    ];

    for (const entity of entities) {
      if (!entity.variable) {
        throw new HttpException(entity.message, HttpStatus.NOT_FOUND);
      }
    }

    for (const entity of entities) {
      if (!entity.variable) {
        throw new HttpException(entity.message, HttpStatus.NOT_FOUND);
      }
    }
    const showTime = new this.showTimeModel({
      ...createBookingDto,
      movie: movie._id,
      cinema: cinema._id,
    });
    const showTimeCreated = await showTime.save();
    return showTimeCreated;
  }

  findAll() {
    return `This action returns all showtimes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} showtime`;
  }

  update(id: number, createShowtimeDto: CreateShowtimeDto) {
    return `This action updates a #${id} showtime`;
  }

  remove(id: number) {
    return `This action removes a #${id} showtime`;
  }
}
