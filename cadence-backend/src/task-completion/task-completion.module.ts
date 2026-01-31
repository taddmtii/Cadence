import { Module } from '@nestjs/common';
import { TaskCompletionController } from './task-completion.controller';
import { TaskCompletionService } from './taskCompletion.service';

@Module({
  controllers: [TaskCompletionController],
  providers: [TaskCompletionService],
  exports: [TaskCompletionService]
})
export class TaskCompletionModule { }
