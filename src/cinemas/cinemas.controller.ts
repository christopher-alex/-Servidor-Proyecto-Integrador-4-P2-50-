import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  NotFoundException,
  Put,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { CinemaService } from './cinemas.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { MorganInterceptor } from 'nest-morgan';

@Controller('cinemas')
export class CinemasController {
  constructor(private readonly cinemaService: CinemaService) {}

  /**
   * @Post Crear película
   *
   * @Route /create
   * Crea una nueva película en la base de datos
   * @param res - Respuesta del servidor
   * @param createCinemaDto - Datos para crear una película
   * @returns respuesta de éxito con la película creada
   */
  @Post('/create')
  async createCinema(@Res() res, @Body() createCinemaDto: CreateCinemaDto) {
    const cinema = await this.cinemaService.createCinema(createCinemaDto);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      message: 'Película creada correctamente',
      data: { cinema },
    });
  }

  /**
   * @Get
   *
   * @Route
   *
   * @param res
   * @returns
   */
  @Get('/')
  async getCinemas(@Res() res) {
    const cinemas = await this.cinemaService.getCinemas();
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      data: { cinemas },
    });
  }

  /**
   * @Get
   *
   * @Route
   *
   * @param res
   * @param cinemaID
   * @throws
   * @returns
   */
  @Get('/:cinemaID')
  async getCinema(@Res() res, @Param('cinemaID') cinemaID) {
    const cinema = await this.cinemaService.getCinema(cinemaID);
    if (!cinema) throw new NotFoundException('Cinema does not exist!');
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      data: { cinema },
    });
  }

  /**
   * @Put Actualizar una película
   *
   * @Route /update/:movieID
   * Actualiza una película en la base de datos
   * @param res - Respuesta del servidor
   * @param createCinemaDto - Datos para actualizar la película
   * @param cinemaID - ID de la película a actualizar
   * @throws NotFoundException si la película no existe
   * @returns respuesta de éxito con la película actualizada
   */
  @Put('/update/:cinemaID')
  async updateCinema(
    @Res() res,
    @Body() createCinemaDto: CreateCinemaDto,
    @Param('cinemaID') cinemaID,
  ) {
    const updatedCinema = await this.cinemaService.updateCinema(
      cinemaID,
      createCinemaDto,
    );
    if (!updatedCinema) throw new NotFoundException('Cinema does not exist!');
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      message: 'Película actualizada correctamente',
      data: { updatedCinema },
    });
  }

  /**
   * @Delete Eliminar una película
   *
   * @Route /delete/:movieID
   * Elimina una película de la base de datos
   * @param res - Respuesta del servidor
   * @param movieID - ID de la película a eliminar
   * @throws NotFoundException si la película no existe
   * @returns respuesta de éxito con la película eliminada
   */
  @UseInterceptors(MorganInterceptor('combined'))
  @Delete('/delete/:cinemaID')
  async deleteCinema(@Res() res, @Param('cinemaID') cinemaID) {
    const cinemaDeleted = await this.cinemaService.deleteCinema(cinemaID);
    if (!cinemaDeleted) throw new NotFoundException('Cinema does not exist!');
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      message: 'Película eliminada correctamente',
      data: { cinemaDeleted },
    });
  }
}
