import { Test, TestingModule } from '@nestjs/testing';
import { InfoFasilitiesService } from './info_fasilities.service';

describe('InfoFasilitiesService', () => {
  let service: InfoFasilitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfoFasilitiesService],
    }).compile();

    service = module.get<InfoFasilitiesService>(InfoFasilitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
