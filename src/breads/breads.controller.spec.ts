import { Test, TestingModule } from '@nestjs/testing';
import { BreadsController } from './breads.controller';
import { BreadsService } from './breads.service';

describe('BreadsController', () => {
  let controller: BreadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BreadsController],
      providers: [BreadsService],
    }).compile();

    controller = module.get<BreadsController>(BreadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
