import { Prisma, TaskGroup } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskGroupService {
  constructor(private prisma: PrismaService) { }

  async taskGroup(taskGroupWhereUniqueInput: Prisma.TaskGroupWhereUniqueInput): Promise<TaskGroup | null> {
    return this.prisma.taskGroup.findUnique({ where: taskGroupWhereUniqueInput })
  }

  async taskGroups(params: {
    skip?: number; // skip first N users (for pagination)
    take?: number; // limits how many results returned
    cursor?: Prisma.TaskGroupWhereUniqueInput; // for pagination
    where?: Prisma.TaskGroupWhereInput;
    orderBy?: Prisma.TaskGroupOrderByWithRelationInput; // sorts results
  }): Promise<TaskGroup[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.taskGroup.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTaskGroup(data: Prisma.TaskGroupCreateInput): Promise<TaskGroup> {
    return this.prisma.taskGroup.create({ data })
  }

  async updateTaskGroup(params: {
    where: Prisma.TaskGroupWhereUniqueInput;
    data: Prisma.TaskGroupUpdateInput;
  }): Promise<TaskGroup> {
    const { where, data } = params;
    return this.prisma.taskGroup.update({ data, where });
  }

  async deleteTaskGroup(where: Prisma.TaskGroupWhereUniqueInput): Promise<TaskGroup> {
    return this.prisma.taskGroup.delete({ where });
  }
}
