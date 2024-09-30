import { Test, TestingModule } from '@nestjs/testing';
import { InfoHotelController } from './info_hotel.controller';

describe('InfoHotelController', () => {
  let controller: InfoHotelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfoHotelController],
    }).compile();

    controller = module.get<InfoHotelController>(InfoHotelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
