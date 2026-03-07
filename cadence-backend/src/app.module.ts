import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { TaskCompletionModule } from './task-completion/task-completion.module';
import { TaskModule } from './task/task.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, UserModule, TaskCompletionModule, TaskModule, CategoryModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
