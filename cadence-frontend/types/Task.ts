import { Frequency } from "./Frequency";
import { Priority } from "./Priority";

export interface Task {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  archived: boolean;
  archivedAt: Date | null;
  description: string | null;
  priority: Priority
  frequency: Frequency
  categoryId: string;
  taskGroupId: string | null;
  userId: string;
}
