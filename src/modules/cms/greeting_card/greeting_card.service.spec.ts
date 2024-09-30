import { Test, TestingModule } from '@nestjs/testing';
import { GreetingCardService } from './greeting_card.service';

describe('GreetingCardService', () => {
  let service: GreetingCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GreetingCardService],
    }).compile();

    service = module.get<GreetingCardService>(GreetingCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
