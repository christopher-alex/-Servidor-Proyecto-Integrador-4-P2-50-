import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpStatus,
  NotFoundException,
  Put,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { BookingService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { MorganInterceptor } from 'nest-morgan';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingService: BookingService) {}

  /**
   * @Post Crear película
   *
   * @Route /create
   * Crea una nueva película en la base de datos
   * @param res - Respuesta del servidor
   * @param createBookingDto - Datos para crear una película
   * @returns respuesta de éxito con la película creada
   */
  @Post('/create')
  async createBooking(@Res() res, @Body() createBookingDto: CreateBookingDto) {
    const booking = await this.bookingService.createBooking(createBookingDto);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      message: 'Película creada correctamente',
      data: { booking },
    });
  }

  /**
   * @Get Obtener todas las películas
   *
   * @Route /
   * Obtiene todas las películas de la base de datos
   * @param res - Respuesta del servidor
   * @returns respuesta de éxito con las películas obtenidas
   */
  @Get('/')
  async getBookings(@Res() res) {
    const bookings = await this.bookingService.getBookings();
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      data: { bookings },
    });
  }

  /**
   * @Get Obtener una película por ID
   *
   * @Route /:movieID
   * Obtiene una película por su ID
   * @param res - Respuesta del servidor
   * @param bookingID - ID de la película a obtener
   * @throws NotFoundException si la película no existe
   * @returns respuesta de éxito con la película obtenida
   */
  @Get('/:bookingID')
  async getBooking(@Res() res, @Param('bookingID') bookingID) {
    const booking = await this.bookingService.getBooking(bookingID);
    if (!booking) throw new NotFoundException('Booking does not exist!');
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      data: { booking },
    });
  }

  @Get('/search/:title')
  async getBookingsByTitle(@Res() res, @Param('title') title) {
    const bookings = await this.bookingService.getBookingsByTitle(title);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      data: { bookings },
    });
  }

  /**
   * @Put Actualizar una película
   *
   * @Route /update/:movieID
   * Actualiza una película en la base de datos
   * @param res - Respuesta del servidor
   * @param createBookingDto - Datos para actualizar la película
   * @param bookingID - ID de la película a actualizar
   * @throws NotFoundException si la película no existe
   * @returns respuesta de éxito con la película actualizada
   */
  @Put('/update/:bookingID')
  async updateBooking(
    @Res() res,
    @Body() createBookingDto: CreateBookingDto,
    @Param('bookingID') bookingID,
  ) {
    const updatedBooking = await this.bookingService.updateBooking(
      bookingID,
      createBookingDto,
    );
    if (!updatedBooking) throw new NotFoundException('Booking does not exist!');
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      message: 'Película actualizada correctamente',
      data: { updatedBooking },
    });
  }

  /**
   * @Delete Eliminar una película
   *
   * @Route /delete/:movieID
   * Elimina una película de la base de datos
   * @param res - Respuesta del servidor
   * @param bookingID - ID de la película a eliminar
   * @throws NotFoundException si la película no existe
   * @returns respuesta de éxito con la película eliminada
   */
  @UseInterceptors(MorganInterceptor('combined'))
  @Delete('/delete/:bookingID')
  async deleteBooking(@Res() res, @Param('bookingID') bookingID) {
    const bookingDeleted = await this.bookingService.deleteBooking(bookingID);
    if (!bookingDeleted) throw new NotFoundException('Booking does not exist!');
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      message: 'Película eliminada correctamente',
      data: { bookingDeleted },
    });
  }
}


