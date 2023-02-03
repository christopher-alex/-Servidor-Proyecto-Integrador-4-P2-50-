import { Test, TestingModule } from '@nestjs/testing';
import { TicketTypesController } from './ticket_types.controller';
import { TicketTypeService } from './ticket_types.service';

describe('TicketTypesController', () => {
  let controller: TicketTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketTypesController],
      providers: [TicketTypeService],
    }).compile();

    controller = module.get<TicketTypesController>(TicketTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
