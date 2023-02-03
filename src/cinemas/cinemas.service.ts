import { Injectable } from '@nestjs/common';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cinema } from './entities/cinema.entity';
import { CinemaDocument } from './schema/cinema.schema';

@Injectable()
export class CinemaService {
  constructor(
    @InjectModel(Cinema.name) private cinemaModel: Model<CinemaDocument>,
  ) {}

  /**
   * getMovies - Obtiene una lista de películas
   *
   * @returns {Promise<Movie[]>} Promise con un arreglo de películas
   */
  async getCinemas(): Promise<Cinema[]> {
    const cinemas = this.cinemaModel.find();
    return cinemas;
  }

  /**
   * getMovie - Obtiene una película por su ID
   *
   * @param {string} cinemaID ID de la película a obtener
   * @returns {Promise<Movie>} Promise con la película obtenida
   */
  async getCinema(cinemaID: string): Promise<Cinema> {
    const cinema = this.cinemaModel.findById(cinemaID);
    return cinema;
  }

  /**
   * createMovie - Crea una nueva película
   *
   * @param {CreateMovieDto} createCinemaDto Datos de la nueva película
   * @returns {Promise<Movie>} Promise con la película creada
   */
  async createCinema(createCinemaDto: CreateCinemaDto): Promise<Cinema> {
    const newCinema = new this.cinemaModel(createCinemaDto);
    return newCinema.save();
  }

  /**
   * updateMovie - Actualiza una película
   *
   * @param {string} cinemaID ID de la película a actualizar
   * @param {CreateMovieDto} createProductDTO Datos actualizados de la película
   * @returns {Promise<Movie>} Promise con la película actualizada
   */
  async updateCinema(
    cinemaID: string,
    createProductDTO: CreateCinemaDto,
  ): Promise<Cinema> {
    const updatedCinema = this.cinemaModel.findByIdAndUpdate(
      cinemaID,
      createProductDTO,
      { new: true },
    );
    return updatedCinema;
  }

  /**
   * deleteMovie - Elimina una película por su ID
   *
   * @param {string} cinemaID ID de la película a eliminar
   * @returns {Promise<any>} Promise con la respuesta de la operación
   */
  async deleteCinema(cinemaID: string): Promise<any> {
    const deletedCinema = this.cinemaModel.findByIdAndDelete(cinemaID);
    return deletedCinema;
  }
}
