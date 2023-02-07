import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './entities/movie.entity';
import { MovieDocument } from './schema/movies.schema';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  /**
   * getMovies - Obtiene una lista de películas
   *
   * @returns {Promise<Movie[]>} Promise con un arreglo de películas
   */
  async getMovies(): Promise<Movie[]> {
    const movies = this.movieModel.find();
    return movies;
  }

  /**
   * getMovie - Obtiene una película por su ID
   *
   * @param {string} movieID ID de la película a obtener
   * @returns {Promise<Movie>} Promise con la película obtenida
   */
  async getMovie(movieID: string): Promise<Movie> {
    const movie = this.movieModel.findById(movieID);
    return movie;
  }

  /**
   * getMoviesByTitle - Obtiene una lista de películas por su título sin importar mayúsculas o minúsculas
   *
   * @param {string} movieTitle Título de la película a obtener
   * @returns {Promise<Movie[]>} Promise con un arreglo de películas
   */
  async getMoviesByTitle(movieTitle: string): Promise<Movie[]> {
    const movies = this.movieModel.find({
      title: { $regex: movieTitle, $options: 'i' },
    });
    return movies;
  }

  /* getMoviesHasShowtimes(): Promise<Movie[]> {
  } */

  /**
   * createMovie - Crea una nueva película
   *
   * @param {CreateMovieDto} createMovieDto Datos de la nueva película
   * @returns {Promise<Movie>} Promise con la película creada
   */
  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const newMovie = new this.movieModel(createMovieDto);
    return newMovie.save();
  }

  /**
   * updateMovie - Actualiza una película
   *
   * @param {string} movieID ID de la película a actualizar
   * @param {CreateMovieDto} createProductDTO Datos actualizados de la película
   * @returns {Promise<Movie>} Promise con la película actualizada
   */
  async updateMovie(
    movieID: string,
    createProductDTO: CreateMovieDto,
  ): Promise<Movie> {
    const updatedMovie = this.movieModel.findByIdAndUpdate(
      movieID,
      createProductDTO,
      { new: true },
    );
    return updatedMovie;
  }

  /**
   * deleteMovie - Elimina una película por su ID
   *
   * @param {string} movieID ID de la película a eliminar
   * @returns {Promise<any>} Promise con la respuesta de la operación
   */
  async deleteMovie(movieID: string): Promise<any> {
    const deletedMovie = this.movieModel.findByIdAndDelete(movieID);
    return deletedMovie;
  }
}
