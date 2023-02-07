import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateShowtimeDto } from './dto/create-showtime.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cinema, CinemaDocument } from 'src/cinemas/schema/cinema.schema';
import { Movie, MovieDocument } from 'src/movies/schema/movies.schema';
import { Showtime, ShowtimeDocument } from './schema/showtimes.schema';

@Injectable()
export class ShowtimeService {
  constructor(
    @InjectModel(Showtime.name)
    private readonly showtimeModel: Model<ShowtimeDocument>,

    @InjectModel(Movie.name)
    private readonly movieModel: Model<MovieDocument>,

    @InjectModel(Cinema.name)
    private readonly cinemaModel: Model<CinemaDocument>,
  ) {}

  async create(createBookingDto: CreateShowtimeDto, req: any) {
    const [movie, cinema] = await Promise.all([
      this.movieModel.findById(req.movie),
      this.cinemaModel.findById(req.cinema),
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
    const showTime = new this.showtimeModel({
      ...createBookingDto,
      movie: movie._id,
      cinema: cinema._id,
    });
    const showTimeCreated = await showTime.save();
    return showTimeCreated;
  }

  async getShowtimes(): Promise<Showtime[]> {
    const showtimes = this.showtimeModel.find();
    showtimes.populate('movie');
    showtimes.populate('cinema');
    return showtimes;
  }

  /**
   * getMovie - Obtiene una película por su ID
   *
   * @param {string} showtimeID ID de la película a obtener
   * @returns {Promise<Movie>} Promise con la película obtenida
   */
  async getShowtime(showtimeID: string): Promise<Showtime> {
    const showtime = this.showtimeModel.findById(showtimeID);
    showtime.populate('movie');
    showtime.populate('cinema');
    return showtime;
  }

  async getShowtimesByTitle(title: string): Promise<Showtime[]> {
    const showtimes = this.showtimeModel.find({ title: { $regex: title } });
    return showtimes;
  }

  async getShowtimesByMovie(movie: string): Promise<Showtime[]> {
    const showtimes = this.showtimeModel.find({ movie: movie });
        showtimes.populate('movie');
        showtimes.populate('cinema');
    return showtimes;
  }

  /**
   * createMovie - Crea una nueva película
   *
   * @param {CreateMovieDto} createShowtimeDto Datos de la nueva película
   * @returns {Promise<Movie>} Promise con la película creada
   */
  async createShowtime(
    createShowtimeDto: CreateShowtimeDto,
  ): Promise<Showtime> {
    const newShowtime = new this.showtimeModel(createShowtimeDto);
    return newShowtime.save();
  }

  /**
   * updateMovie - Actualiza una película
   *
   * @param {string} showtimeID ID de la película a actualizar
   * @param {CreateMovieDto} createProductDTO Datos actualizados de la película
   * @returns {Promise<Movie>} Promise con la película actualizada
   */
  async updateShowtime(
    showtimeID: string,
    createProductDTO: CreateShowtimeDto,
  ): Promise<Showtime> {
    const updatedShowtime = this.showtimeModel.findByIdAndUpdate(
      showtimeID,
      createProductDTO,
      { new: true },
    );
    return updatedShowtime;
  }

  /**
   * deleteMovie - Elimina una película por su ID
   *
   * @param {string} showtimeID ID de la película a eliminar
   * @returns {Promise<any>} Promise con la respuesta de la operación
   */
  async deleteShowtime(showtimeID: string): Promise<any> {
    const deletedShowtime = this.showtimeModel.findByIdAndDelete(showtimeID);
    return deletedShowtime;
  }
}