import { Test, TestingModule } from '@nestjs/testing';
import { CinemaService } from './cinemas.service';

describe('CinemasService', () => {
  let service: CinemaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CinemaService],
    }).compile();

    service = module.get<CinemaService>(CinemaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
