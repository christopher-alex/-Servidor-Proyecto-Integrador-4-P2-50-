import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, NotFoundException, Put, Res, UseInterceptors } from '@nestjs/common';
import { TicketTypeService } from './ticket_types.service';
import { CreateTicketTypeDto } from './dto/create-ticket_type.dto';
import { MorganInterceptor } from 'nest-morgan';


@Controller('ticketTypes')
export class TicketTypesController {
  constructor(private readonly ticketTypeService: TicketTypeService) {}

  /**
   * @Post Crear película
   *
   * @Route /create
   * Crea una nueva película en la base de datos
   * @param res - Respuesta del servidor
   * @param createTicketTypeDto - Datos para crear una película
   * @returns respuesta de éxito con la película creada
   */
  @Post('/create')
  async createTicketType(
    @Res() res,
    @Body() createTicketTypeDto: CreateTicketTypeDto,
  ) {
    const ticketType = await this.ticketTypeService.createTicketType(
      createTicketTypeDto,
    );
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      message: 'Película creada correctamente',
      data: { ticketType },
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
  async getTicketTypes(@Res() res) {
    const ticketTypes = await this.ticketTypeService.getTicketTypes();
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      data: { ticketTypes },
    });
  }

  /**
   * @Get Obtener una película por ID
   *
   * @Route /:movieID
   * Obtiene una película por su ID
   * @param res - Respuesta del servidor
   * @param ticketTypeID - ID de la película a obtener
   * @throws NotFoundException si la película no existe
   * @returns respuesta de éxito con la película obtenida
   */
  @Get('/:ticketTypeID')
  async getTicketType(@Res() res, @Param('ticketTypeID')ticketTypeID) {
    const ticketType = await this.ticketTypeService.getTicketType(ticketTypeID);
    if (!ticketType) throw new NotFoundException('ticketType does not exist!');
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      data: { ticketType },
    });
  }

  /**
   * @Put Actualizar una película
   *
   * @Route /update/:movieID
   * Actualiza una película en la base de datos
   * @param res - Respuesta del servidor
   * @param createTicketTypeDto - Datos para actualizar la película
   * @param ticketTypeID - ID de la película a actualizar
   * @throws NotFoundException si la película no existe
   * @returns respuesta de éxito con la película actualizada
   */
  @Put('/update/:ticketTypeID')
  async updateticketType(
    @Res() res,
    @Body() createTicketTypeDto: CreateTicketTypeDto,
    @Param('ticketTypeID') ticketTypeID,
  ) {
    const updatedTicketType = await this.ticketTypeService.updateTicketType(
      ticketTypeID,
      createTicketTypeDto,
    );
    if (!updatedTicketType)
      throw new NotFoundException('TicketType does not exist!');
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      message: 'Película actualizada correctamente',
      data: { updatedTicketType },
    });
  }

  /**
   * @Delete Eliminar una película
   *
   * @Route /delete/:movieID
   * Elimina una película de la base de datos
   * @param res - Respuesta del servidor
   * @param ticketTypeID - ID de la película a eliminar
   * @throws NotFoundException si la película no existe
   * @returns respuesta de éxito con la película eliminada
   */
  @UseInterceptors(MorganInterceptor('combined'))
  @Delete('/delete/:ticketTypeID')
  async deleteTicketType(@Res() res, @Param('ticketTypeID') ticketTypeID) {
    const ticketTypeDeleted = await this.ticketTypeService.deleteTicketType(
      ticketTypeID,
    );
    if (!ticketTypeDeleted)
      throw new NotFoundException('TicketType does not exist!');
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      status: 'success',
      message: 'Película eliminada correctamente',
      data: { ticketTypeDeleted },
    });
  }
}
