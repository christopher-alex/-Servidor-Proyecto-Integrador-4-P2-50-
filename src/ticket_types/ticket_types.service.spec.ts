import { Test, TestingModule } from '@nestjs/testing';
import { TicketTypeService } from './ticket_types.service';

describe('TicketTypesService', () => {
  let service: TicketTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketTypeService],
    }).compile();

    service = module.get<TicketTypeService>(TicketTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
