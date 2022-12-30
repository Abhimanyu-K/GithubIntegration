import { Test, TestingModule } from '@nestjs/testing';
import { CreaterepoService } from './createrepo.service';

describe('CreaterepoService', () => {
  let service: CreaterepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreaterepoService],
    }).compile();

    service = module.get<CreaterepoService>(CreaterepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
