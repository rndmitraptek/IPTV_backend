import { Test, TestingModule } from '@nestjs/testing';
import { InfoRoomController } from './info_room.controller';

describe('InfoRoomController', () => {
  let controller: InfoRoomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfoRoomController],
    }).compile();

    controller = module.get<InfoRoomController>(InfoRoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
