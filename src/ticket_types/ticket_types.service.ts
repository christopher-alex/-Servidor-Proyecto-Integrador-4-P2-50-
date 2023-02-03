import { Injectable } from '@nestjs/common';
import { CreateTicketTypeDto } from './dto/create-ticket_type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TicketType, TicketTypeDocument } from './schema/ticket_types.schema';

@Injectable()
export class TicketTypeService {
  constructor(
    @InjectModel(TicketType.name)
    private ticketTypeModel: Model<TicketTypeDocument>,
  ) {}

  /**
   * getMovies - Obtiene una lista de películas
   *
   * @returns {Promise<Movie[]>} Promise con un arreglo de películas
   */
  async getTicketTypes(): Promise<TicketType[]> {
    const ticketTypes = this.ticketTypeModel.find();
    return ticketTypes;
  }

  /**
   * getMovie - Obtiene una película por su ID
   *
   * @param {string} ticketTypeID ID de la película a obtener
   * @returns {Promise<Movie>} Promise con la película obtenida
   */
  async getTicketType(ticketTypeID: string): Promise<TicketType> {
    const ticketType = this.ticketTypeModel.findById(ticketTypeID);
    return ticketType;
  }

  /**
   * createMovie - Crea una nueva película
   *
   * @param {CreateMovieDto} createTicketTypeDto Datos de la nueva película
   * @returns {Promise<Movie>} Promise con la película creada
   */
  async createTicketType(
    createTicketTypeDto: CreateTicketTypeDto,
  ): Promise<TicketType> {
    const newTicketType = new this.ticketTypeModel(createTicketTypeDto);
    return newTicketType.save();
  }

  /**
   * updateMovie - Actualiza una película
   *
   * @param {string} ticketTypeID ID de la película a actualizar
   * @param {CreateMovieDto} createProductDTO Datos actualizados de la película
   * @returns {Promise<Movie>} Promise con la película actualizada
   */
  async updateTicketType(
    ticketTypeID: string,
    createProductDTO: CreateTicketTypeDto,
  ): Promise<TicketType> {
    const updatedTicketType = this.ticketTypeModel.findByIdAndUpdate(
      ticketTypeID,
      createProductDTO,
      { new: true },
    );
    return updatedTicketType;
  }

  /**
   * deleteMovie - Elimina una película por su ID
   *
   * @param {string} ticketTypeID ID de la película a eliminar
   * @returns {Promise<any>} Promise con la respuesta de la operación
   */
  async deleteTicketType(ticketTypeID: string): Promise<any> {
    const deletedTicketType =
      this.ticketTypeModel.findByIdAndDelete(ticketTypeID);
    return deletedTicketType;
  }
}
