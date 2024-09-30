import { Test, TestingModule } from '@nestjs/testing';
import { TvChannelService } from './tv_channel.service';

describe('TvChannelService', () => {
  let service: TvChannelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TvChannelService],
    }).compile();

    service = module.get<TvChannelService>(TvChannelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
