-- DropForeignKey
ALTER TABLE "SegmentExercise" DROP CONSTRAINT "SegmentExercise_exerciseId_fkey";

-- DropIndex
DROP INDEX "SegmentExercise_segmentId_exerciseId_key";

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "SegmentExercise" ALTER COLUMN "exerciseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SegmentExercise" ADD CONSTRAINT "SegmentExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
