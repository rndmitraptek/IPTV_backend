import { Test, TestingModule } from '@nestjs/testing';
import { TvChannelController } from './tv_channel.controller';

describe('TvChannelController', () => {
  let controller: TvChannelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TvChannelController],
    }).compile();

    controller = module.get<TvChannelController>(TvChannelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
