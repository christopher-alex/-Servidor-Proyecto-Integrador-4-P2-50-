import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bookings, BookingsDocument } from '../bookings/schema/bookings.schema';
import { User, UserDocument } from 'src/users/schema/users.schema';
import { Movie, MovieDocument } from 'src/movies/schema/movies.schema';
import { Cinema, CinemaDocument } from 'src/cinemas/schema/cinema.schema';
import { TicketType, TicketTypeDocument } from 'src/ticket_types/schema/ticket_types.schema';
import { Product, ProductDocument } from 'src/products/schemas/products.schema';


@Injectable()
export class BookingsService {
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
    const [
      user,
      movie,
      cinema,
      ticketType,
      product,
    ] = await Promise.all([
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

  findAll() {
    return `This action returns all bookings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
