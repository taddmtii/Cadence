import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { UserController } from './user/user.controller';
import { TaskController } from './task/task.controller';
import { CategoryController } from './category/category.controller';
import { TaskGroupController } from './task-group/task-group.controller';
import { TaskCompletionController } from './task-completion/task-completion.controller';
import { UserService } from './user/user.service';
import { TaskGroupService } from './task-group/taskGroup.service';
import { TaskCompletionService } from './task-completion/taskCompletion.service';
import { CategoryService } from './category/category.service';
import { TaskService } from './task/task.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, TaskController, CategoryController, TaskGroupController, TaskCompletionController, AuthController],
  providers: [PrismaService, UserService, TaskGroupService, TaskCompletionService, CategoryService, TaskService],
})
export class AppModule { }
