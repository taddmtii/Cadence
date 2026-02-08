import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Category, Prisma, Task } from "@prisma/client";

export interface CategoryStats {
  categoryId: string;
  categoryName: string;
  taskCount: number;
}

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) { }

  async task(taskWhereUniqueInput: Prisma.TaskWhereUniqueInput): Promise<Task | null> {
    return this.prisma.task.findUnique({ where: taskWhereUniqueInput })
  }

  async tasks(params: {
    skip?: number; // skip first N users (for pagination)
    take?: number; // limits how many results returned
    cursor?: Prisma.TaskWhereUniqueInput; // for pagination
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.TaskOrderByWithRelationInput; // sorts results
  }): Promise<Task[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.task.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({ data })
  }

  async updateTask(params: {
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.TaskUpdateInput;
  }): Promise<Task> {
    const { where, data } = params;
    return this.prisma.task.update({ data, where });
  }

  async deleteTask(where: Prisma.TaskWhereUniqueInput): Promise<Task> {
    return this.prisma.task.delete({ where });
  }

  async getTodaysTasksByUserId(userId: string): Promise<Task[] | null> {
    const startOfDay = new Date(); // 12:00AM
    const endOfDay = new Date(); // 11:59PM
    startOfDay.setHours(0, 0, 0, 0)
    endOfDay.setHours(23, 59, 59, 999);
    return this.tasks({
      where: {
        userId: userId,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay
        }
      }
    })
  }

  async getCategoryStatsForUser(userId: string): Promise<CategoryStats[]> {
    const tasks = await this.prisma.task.findMany({
      where: {
        userId: userId
      },
      include: {
        // gives us the entire category object instead of just the ID.
        category: true
      }
    })
    const frequencies: Record<string, CategoryStats> = {}

    tasks.map((task) => {
      const categoryId = task.categoryId
      if (frequencies[categoryId]) {
        frequencies[categoryId].taskCount += 1
      }
      else {
        frequencies[categoryId] = {
          categoryId: categoryId,
          categoryName: task.category.name,
          taskCount: 1
        }
      }
    })
    return Object.values(frequencies)
  }

  // async getCurrentUserStreakByUserId(userId: string): Promise<number> {

  // }

  // async getLongestUserStreakByUserId(userId: string): Promise<number> {

  // }

  // async getWeeklyGoalProgressByUserId(userId: string): Promise<number> {

  // }

  // async getImprovementMetricByUserId(userId: string): Promise<number> {

  // }

}
