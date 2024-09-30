import { Test, TestingModule } from '@nestjs/testing';
import { NearbyAttractionService } from './nearby_attraction.service';

describe('NearbyAttractionService', () => {
  let service: NearbyAttractionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NearbyAttractionService],
    }).compile();

    service = module.get<NearbyAttractionService>(NearbyAttractionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
