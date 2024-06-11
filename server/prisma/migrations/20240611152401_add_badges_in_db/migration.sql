-- CreateTable
CREATE TABLE "Badge" (
    "id" SERIAL NOT NULL,
    "slud" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Badge_id_key" ON "Badge"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_slud_key" ON "Badge"("slud");
