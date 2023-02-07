import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bookings, BookingsDocument } from '../bookings/schema/bookings.schema';
import { User, UserDocument } from 'src/users/schema/users.schema';
import { Movie, MovieDocument } from 'src/movies/schema/movies.schema';
import { Cinema, CinemaDocument } from 'src/cinemas/schema/cinema.schema';
import {
  TicketType,
  TicketTypeDocument,
} from 'src/ticket_types/schema/ticket_types.schema';
import { Product, ProductDocument } from 'src/products/schemas/products.schema';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Bookings.name)
    private readonly bookingModel: Model<BookingsDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Movie.name)
    private readonly movieModel: Model<MovieDocument>,
    @InjectModel(Cinema.name)
    private readonly cinemaModel: Model<CinemaDocument>,
    @InjectModel(TicketType.name)
    private readonly ticketTypeModel: Model<TicketTypeDocument>,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}
  async create(createBookingDto: CreateBookingDto, req: any) {
    const [user, movie, cinema, ticketType, product] = await Promise.all([
      this.userModel.findById(req.user_id),
      this.movieModel.findById(req.movie_id),
      this.cinemaModel.findById(req.cinema_id),
      this.ticketTypeModel.findById(req.ticketType_id),
      this.productModel.findById(req.product_id),
    ]);

    const entities = [
      { variable: user, message: 'User not found' },
      { variable: movie, message: 'Movie not found MMV' },
      { variable: ticketType, message: 'TicketType not found' },
      { variable: cinema, message: 'Cinema not found' },
      { variable: product, message: 'Product not found' },
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
    const booking = new this.bookingModel({
      ...createBookingDto,
      user: user._id,
      movie: movie._id,
      cinema: cinema._id,
      ticketType: ticketType._id,
      product: product._id,
    });
    const bookingCreated = await booking.save();
    return bookingCreated;
  }

  async getBookings(): Promise<Booking[]> {
    const bookings = this.bookingModel.find();
    return bookings;
  }

  /**
   * getMovie - Obtiene una película por su ID
   *
   * @param {string} bookingID ID de la película a obtener
   * @returns {Promise<Movie>} Promise con la película obtenida
   */
  async getBooking(bookingID: string): Promise<Booking> {
    const booking = this.bookingModel.findById(bookingID);
    return booking;
  }

  async getBookingsByTitle(title: string): Promise<Booking[]> {
    const bookings = this.bookingModel.find({ title: { $regex: title } });
    return bookings;
  }

  /**
   * createMovie - Crea una nueva película
   *
   * @param {CreateMovieDto} createBookingDto Datos de la nueva película
   * @returns {Promise<Movie>} Promise con la película creada
   */
  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    const newBooking = new this.bookingModel(createBookingDto);
    return newBooking.save();
  }

  /**
   * updateMovie - Actualiza una película
   *
   * @param {string} boookingID ID de la película a actualizar
   * @param {CreateMovieDto} createProductDTO Datos actualizados de la película
   * @returns {Promise<Movie>} Promise con la película actualizada
   */
  async updateBooking(
    bookingID: string,
    createProductDTO: CreateBookingDto,
  ): Promise<Booking> {
    const updatedBooking = this.movieModel.findByIdAndUpdate(
      bookingID,
      createProductDTO,
      { new: true },
    );
    return updatedBooking;
  }

  /**
   * deleteMovie - Elimina una película por su ID
   *
   * @param {string} bookingID ID de la película a eliminar
   * @returns {Promise<any>} Promise con la respuesta de la operación
   */
  async deleteBooking(bookingID: string): Promise<any> {
    const deletedBooking = this.bookingModel.findByIdAndDelete(bookingID);
    return deletedBooking;
  }
}
