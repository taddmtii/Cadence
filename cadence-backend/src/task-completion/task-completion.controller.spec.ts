import { Test, TestingModule } from '@nestjs/testing';
import { TaskCompletionController } from './task-completion.controller';

describe('TaskCompletionController', () => {
  let controller: TaskCompletionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskCompletionController],
    }).compile();

    controller = module.get<TaskCompletionController>(TaskCompletionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
