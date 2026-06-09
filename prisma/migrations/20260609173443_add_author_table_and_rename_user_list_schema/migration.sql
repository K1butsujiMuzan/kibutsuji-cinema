-- AlterTable
ALTER TABLE "anime" ADD COLUMN     "author_id" TEXT;

-- CreateTable
CREATE TABLE "authors" (
    "id" TEXT NOT NULL,
    "english_name" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AuthorToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AuthorToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AuthorToUser_B_index" ON "_AuthorToUser"("B");

-- AddForeignKey
ALTER TABLE "anime" ADD CONSTRAINT "anime_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToUser" ADD CONSTRAINT "_AuthorToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToUser" ADD CONSTRAINT "_AuthorToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
