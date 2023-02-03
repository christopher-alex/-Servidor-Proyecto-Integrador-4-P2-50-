import { Module } from '@nestjs/common';
import { CinemaService } from './cinemas.service';
import { CinemasController } from './cinemas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cinema, CinemaSchema } from './schema/cinema.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cinema.name, schema: CinemaSchema }]),
  ],
  controllers: [CinemasController],
  providers: [CinemaService],
})
export class CinemasModule {}
