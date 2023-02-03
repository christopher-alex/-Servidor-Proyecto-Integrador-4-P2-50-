import { Module } from '@nestjs/common';
import { TicketTypeService } from './ticket_types.service';
import { TicketTypesController } from './ticket_types.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketType, TicketTypeSchema } from './schema/ticket_types.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TicketType.name, schema: TicketTypeSchema }]),
  ],
  controllers: [TicketTypesController],
  providers: [TicketTypeService],
})
export class TicketTypesModule {}
