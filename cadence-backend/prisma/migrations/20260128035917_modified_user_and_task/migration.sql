/*
  Warnings:

  - Added the required column `archived` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `archivedAt` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `completedAt` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastCompleted` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "archived" BOOLEAN NOT NULL,
ADD COLUMN     "archivedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "completedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lastCompleted" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
