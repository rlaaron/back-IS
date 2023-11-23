import { Test, TestingModule } from '@nestjs/testing';
import { BreadsService } from './breads.service';

describe('BreadsService', () => {
  let service: BreadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BreadsService],
    }).compile();

    service = module.get<BreadsService>(BreadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
