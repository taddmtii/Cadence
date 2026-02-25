import { DayOfWeek } from "./DayOfWeek";
import { Priority } from "./Priority";

export interface Task {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  archived: boolean;
  archivedAt: Date | null;
  description: string | null;
  priority: Priority;
  recurringDays: DayOfWeek[];
  reminderTime: Date | null;
  categoryId: string;
  taskGroupId: string | null;
  userId: string;
}
