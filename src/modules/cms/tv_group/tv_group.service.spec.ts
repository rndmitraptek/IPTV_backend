import { Test, TestingModule } from '@nestjs/testing';
import { TvGroupService } from './tv_group.service';

describe('TvGroupService', () => {
  let service: TvGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TvGroupService],
    }).compile();

    service = module.get<TvGroupService>(TvGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
