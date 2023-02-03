import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShowtimeService } from './showtimes.service';
import { CreateShowtimeDto } from './dto/create-showtime.dto';



@Controller('showtimes')
export class ShowTimesController {
  constructor(private readonly showtimesService: ShowtimeService) {}

  @Post()
  create(@Body() createShowtimeDto: CreateShowtimeDto) {
    const showtimeDto = createShowtimeDto;
    return this.showtimesService.create(createShowtimeDto, showtimeDto);
  }

  @Get()
  findAll() {
    return this.showtimesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.showtimesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() createShowtimeDto: CreateShowtimeDto,
  ) {
    return this.showtimesService.update(+id, createShowtimeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.showtimesService.remove(+id);
  }
}
