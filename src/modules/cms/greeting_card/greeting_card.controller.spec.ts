import { Test, TestingModule } from '@nestjs/testing';
import { GreetingCardController } from './greeting_card.controller';

describe('GreetingCardController', () => {
  let controller: GreetingCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GreetingCardController],
    }).compile();

    controller = module.get<GreetingCardController>(GreetingCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
