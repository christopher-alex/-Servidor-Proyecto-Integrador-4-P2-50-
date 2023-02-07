import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';
import { MorganModule } from 'nest-morgan';
import { ProductsModule } from './products/products.module';
import { CinemasModule } from './cinemas/cinemas.module';
import { TicketTypesModule } from './ticket_types/ticket_types.module';
import { ShowtimesModule } from './showtimes/showtimes.module';

@Module({
  imports: [
    MorganModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/cine-buy-bd'),
    MoviesModule,
    AuthModule,
    UsersModule,
    BookingsModule,
    CinemasModule,
    TicketTypesModule,
    ShowtimesModule,
    ProductsModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
