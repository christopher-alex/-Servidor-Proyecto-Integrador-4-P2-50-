import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, NotFoundException, Put, Res, UseInterceptors } from '@nestjs/common';
import { ShowtimeService } from './showtimes.service';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { MorganInterceptor } from 'nest-morgan';



@Controller('showtimes')
export class ShowtimesController {
  movieService: any;
  constructor(private readonly showtimeService: ShowtimeService) {}

  /**
   * @Post Crear película
   *
   * @Route /create
   * Crea una nueva película en la base de datos
   * @param res - Respuesta del servidor
   * @param createShowtimeDto - Datos para crear una película
   * @returns respuesta de éxito con la película creada
   */
  @Post('/create')
  async createShowtime(
    @Res() res,
    @Body() createShowtimeDto: CreateShowtimeDto,
  ) {
    const showtime = await this.showtimeService.createShowtime(
      createShowtimeDto,
    );
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      message: 'Película creada correctamente',
      data: { showtime },
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
  async getShowtimes(@Res() res) {
    const showtimes = await this.showtimeService.getShowtimes();
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      data: { showtimes },
    });
  }

  /**
   * @Get Obtener una película por ID
   *
   * @Route /:movieID
   * Obtiene una película por su ID
   * @param res - Respuesta del servidor
   * @param showtimeID - ID de la película a obtener
   * @throws NotFoundException si la película no existe
   * @returns respuesta de éxito con la película obtenida
   */
  @Get('/:showtimeID')
  async getShowtime(@Res() res, @Param('showtimeID') showtimeID) {
    const showtime = await this.showtimeService.getShowtime(showtimeID);
    if (!showtime) throw new NotFoundException('Showtime does not exist!');
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      data: { showtime },
    });
  }

  @Get('/search/:title')
  async getShowtimesByTitle(@Res() res, @Param('title') title) {
    const showtimes = await this.showtimeService.getShowtimesByTitle(title);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      data: { showtimes },
    });
  }

  @Get('/movie/:movieID')
  async getShowtimesByMovie(@Res() res, @Param('movieID') movieID) {
    const showtimes = await this.showtimeService.getShowtimesByMovie(movieID);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,  
      status: 'success',
      data: { showtimes },
    });
  }

  /**
   * @Put Actualizar una película
   *
   * @Route /update/:movieID
   * Actualiza una película en la base de datos
   * @param res - Respuesta del servidor
   * @param createShowtimeDto - Datos para actualizar la película
   * @param showtimeID - ID de la película a actualizar
   * @throws NotFoundException si la película no existe
   * @returns respuesta de éxito con la película actualizada
   */
  @Put('/update/:showtimeID')
  async updateShowtime(
    @Res() res,
    @Body() createShowtimeDto: CreateShowtimeDto,
    @Param('showtimeID') showtimeID,
  ) {
    const updatedShowtime = await this.showtimeService.updateShowtime(
      showtimeID,
      createShowtimeDto,
    );
    if (!updatedShowtime)
      throw new NotFoundException('Showtime does not exist!');
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      message: 'Película actualizada correctamente',
      data: { updatedShowtime },
    });
  }

  /**
   * @Delete Eliminar una película
   *
   * @Route /delete/:movieID
   * Elimina una película de la base de datos
   * @param res - Respuesta del servidor
   * @param showtimeID - ID de la película a eliminar
   * @throws NotFoundException si la película no existe
   * @returns respuesta de éxito con la película eliminada
   */
  @UseInterceptors(MorganInterceptor('combined'))
  @Delete('/delete/:showtimeID')
  async deleteShowtime(@Res() res, @Param('showtimeID') showtimeID) {
    const showtimeDeleted = await this.showtimeService.deleteShowtime(
      showtimeID,
    );
    if (!showtimeDeleted)
      throw new NotFoundException('Showtime does not exist!');
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      message: 'Película eliminada correctamente',
      data: { showtimeDeleted },
    });
  }
}


