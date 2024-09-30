import { Test, TestingModule } from '@nestjs/testing';
import { TvGroupController } from './tv_group.controller';

describe('TvGroupController', () => {
  let controller: TvGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TvGroupController],
    }).compile();

    controller = module.get<TvGroupController>(TvGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
