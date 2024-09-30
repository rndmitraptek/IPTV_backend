import { Test, TestingModule } from '@nestjs/testing';
import { IptvFeatureService } from './iptv_feature.service';

describe('IptvFeatureService', () => {
  let service: IptvFeatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IptvFeatureService],
    }).compile();

    service = module.get<IptvFeatureService>(IptvFeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
