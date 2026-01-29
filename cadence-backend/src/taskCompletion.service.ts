import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Prisma, TaskCompletion } from "@prisma/client";

@Injectable()
export class TaskCompletionService {
  constructor(private prisma: PrismaService) { }

  async taskCompletion(taskCompletionWhereUniqueInput: Prisma.TaskCompletionWhereUniqueInput): Promise<TaskCompletion | null> {
    return this.prisma.taskCompletion.findUnique({ where: taskCompletionWhereUniqueInput })
  }

  async taskCompletions(params: {
    skip?: number; // skip first N users (for pagination)
    take?: number; // limits how many results returned
    cursor?: Prisma.TaskCompletionWhereUniqueInput; // for pagination
    where?: Prisma.TaskCompletionWhereInput;
    orderBy?: Prisma.TaskCompletionOrderByWithRelationInput; // sorts results
  }): Promise<TaskCompletion[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.taskCompletion.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTaskCompletions(data: Prisma.TaskCompletionCreateInput): Promise<TaskCompletion> {
    return this.prisma.taskCompletion.create({ data })
  }

  async updateTaskCompletions(params: {
    where: Prisma.TaskCompletionWhereUniqueInput;
    data: Prisma.TaskCompletionUpdateInput;
  }): Promise<TaskCompletion> {
    const { where, data } = params;
    return this.prisma.taskCompletion.update({ data, where });
  }

  async deleteTaskCompletions(where: Prisma.TaskCompletionWhereUniqueInput): Promise<TaskCompletion> {
    return this.prisma.taskCompletion.delete({ where });
  }
}
