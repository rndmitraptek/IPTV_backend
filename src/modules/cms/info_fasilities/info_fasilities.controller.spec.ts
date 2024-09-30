import { Test, TestingModule } from '@nestjs/testing';
import { InfoFasilitiesController } from './info_fasilities.controller';

describe('InfoFasilitiesController', () => {
  let controller: InfoFasilitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfoFasilitiesController],
    }).compile();

    controller = module.get<InfoFasilitiesController>(InfoFasilitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
