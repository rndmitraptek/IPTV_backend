import { Test, TestingModule } from '@nestjs/testing';
import { ApkVersionController } from './apk_version.controller';

describe('ApkVersionController', () => {
  let controller: ApkVersionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApkVersionController],
    }).compile();

    controller = module.get<ApkVersionController>(ApkVersionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
