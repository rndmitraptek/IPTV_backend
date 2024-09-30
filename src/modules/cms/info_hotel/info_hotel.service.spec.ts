import { Test, TestingModule } from '@nestjs/testing';
import { InfoHotelService } from './info_hotel.service';

describe('InfoHotelService', () => {
  let service: InfoHotelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfoHotelService],
    }).compile();

    service = module.get<InfoHotelService>(InfoHotelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
