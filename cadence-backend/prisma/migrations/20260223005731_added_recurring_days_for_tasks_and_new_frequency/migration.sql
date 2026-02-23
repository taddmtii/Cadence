-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

-- AlterEnum
ALTER TYPE "Frequency" ADD VALUE 'Custom';

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "recurringDays" "DayOfWeek"[] DEFAULT ARRAY[]::"DayOfWeek"[];
