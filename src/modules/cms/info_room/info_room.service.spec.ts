import { Test, TestingModule } from '@nestjs/testing';
import { InfoRoomService } from './info_room.service';

describe('InfoRoomService', () => {
  let service: InfoRoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfoRoomService],
    }).compile();

    service = module.get<InfoRoomService>(InfoRoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
