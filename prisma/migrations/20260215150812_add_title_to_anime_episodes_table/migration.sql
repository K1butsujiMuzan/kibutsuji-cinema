-- AlterTable
ALTER TABLE "anime" ALTER COLUMN "episodes_released" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "anime_episodes" ADD COLUMN     "title" TEXT;
