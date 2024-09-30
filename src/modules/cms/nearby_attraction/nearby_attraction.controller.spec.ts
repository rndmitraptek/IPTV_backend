import { Test, TestingModule } from '@nestjs/testing';
import { NearbyAttractionController } from './nearby_attraction.controller';

describe('NearbyAttractionController', () => {
  let controller: NearbyAttractionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NearbyAttractionController],
    }).compile();

    controller = module.get<NearbyAttractionController>(NearbyAttractionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
