/*
  Warnings:

  - You are about to drop the `TaskGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_taskGroupId_fkey";

-- DropForeignKey
ALTER TABLE "TaskGroup" DROP CONSTRAINT "TaskGroup_userId_fkey";

-- DropTable
DROP TABLE "TaskGroup";
