import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
//import { BillboardsModule } from './billboards/billboards.module';
//import { TicketsModule } from './tickets/tickets.module';
//import { BookingsModule } from './bookings/bookings.module';
//import { CatalogsModule } from './catalogs/catalogs.module';
//import { SchedulesModule } from './schedules/schedules.module';
//import { TheatersModule } from './theaters/theaters.module';
import { MorganModule } from 'nest-morgan';
import { ProductsModule } from './products/products.module';
import { CinemasModule } from './cinemas/cinemas.module';
import { TicketTypesModule } from './ticket_types/ticket_types.module';
import { ShowTimesModule } from './showtimes/showtimes.module';

@Module({
  imports: [
    MorganModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/cine-buy-bd'),
    MoviesModule,
    AuthModule,
    UsersModule,
    //BillboardsModule,
    //TicketsModule,
    //BookingsModule,
    //CatalogsModule,
    //SchedulesModule,
    //TheatersModule,
    ProductsModule,
    CinemasModule,
    TicketTypesModule,
    ShowTimesModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}