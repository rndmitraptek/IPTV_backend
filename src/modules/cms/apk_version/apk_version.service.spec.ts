import { Test, TestingModule } from '@nestjs/testing';
import { ApkVersionService } from './apk_version.service';

describe('ApkVersionService', () => {
  let service: ApkVersionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApkVersionService],
    }).compile();

    service = module.get<ApkVersionService>(ApkVersionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
