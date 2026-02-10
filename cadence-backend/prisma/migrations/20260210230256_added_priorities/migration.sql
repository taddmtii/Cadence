-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('Low', 'Medium', 'High', 'Urgent');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "priority" "Priority" DEFAULT 'Low';
