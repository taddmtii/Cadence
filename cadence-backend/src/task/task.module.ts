import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskCompletionService } from 'src/task-completion/taskCompletion.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskCompletionService, UserService],
  exports: [TaskService]
})
export class TaskModule { }
