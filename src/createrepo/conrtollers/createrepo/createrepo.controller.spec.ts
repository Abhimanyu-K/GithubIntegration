import { Test, TestingModule } from '@nestjs/testing';
import { CreaterepoController } from './createrepo.controller';

describe('CreaterepoController', () => {
  let controller: CreaterepoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreaterepoController],
    }).compile();

    controller = module.get<CreaterepoController>(CreaterepoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
