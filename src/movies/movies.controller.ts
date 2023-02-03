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
import { MovieService } from './movies.service';
import { CreateMovieDto } from './dto/movie.dto';
import { MorganInterceptor } from 'nest-morgan';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MovieService) {}

  /**
   * @Post Crear película
   *
   * @Route /create
   * Crea una nueva película en la base de datos
   * @param res - Respuesta del servidor
   * @param createMovieDto - Datos para crear una película
   * @returns respuesta de éxito con la película creada
   */
  @Post('/create')
  async createMovie(@Res() res, @Body() createMovieDto: CreateMovieDto) {
    const movie = await this.movieService.createMovie(createMovieDto);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      message: 'Película creada correctamente',
      data: { movie },
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
  async getMovies(@Res() res) {
    const movies = await this.movieService.getMovies();
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      data: { movies },
    });
  }

  /**
   * @Get Obtener una película por ID
   *
   * @Route /:movieID
   * Obtiene una película por su ID
   * @param res - Respuesta del servidor
   * @param movieID - ID de la película a obtener
   * @throws NotFoundException si la película no existe
   * @returns respuesta de éxito con la película obtenida
   */
  @Get('/:movieID')
  async getMovie(@Res() res, @Param('movieID') movieID) {
    const movie = await this.movieService.getMovie(movieID);
    if (!movie) throw new NotFoundException('Movie does not exist!');
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      data: { movie },
    });
  }

  @Get('/search/:title')
  async getMoviesByTitle(@Res() res, @Param('title') title) {
    const movies = await this.movieService.getMoviesByTitle(title);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      data: { movies },
    });
  }

  /**
   * @Put Actualizar una película
   *
   * @Route /update/:movieID
   * Actualiza una película en la base de datos
   * @param res - Respuesta del servidor
   * @param createMovieDto - Datos para actualizar la película
   * @param movieID - ID de la película a actualizar
   * @throws NotFoundException si la película no existe
   * @returns respuesta de éxito con la película actualizada
   */
  @Put('/update/:movieID')
  async updateMovie(
    @Res() res,
    @Body() createMovieDto: CreateMovieDto,
    @Param('movieID') movieID,
  ) {
    const updatedMovie = await this.movieService.updateMovie(
      movieID,
      createMovieDto,
    );
    if (!updatedMovie) throw new NotFoundException('Movie does not exist!');
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      message: 'Película actualizada correctamente',
      data: { updatedMovie },
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
  @Delete('/delete/:movieID')
  async deleteMovie(@Res() res, @Param('movieID') movieID) {
    const movieDeleted = await this.movieService.deleteMovie(movieID);
    if (!movieDeleted) throw new NotFoundException('Movie does not exist!');
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      message: 'Película eliminada correctamente',
      data: { movieDeleted },
    });
  }
}
  
