import { Test, TestingModule } from '@nestjs/testing';
import { IptvFeatureController } from './iptv_feature.controller';

describe('IptvFeatureController', () => {
  let controller: IptvFeatureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IptvFeatureController],
    }).compile();

    controller = module.get<IptvFeatureController>(IptvFeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
