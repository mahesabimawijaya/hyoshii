-- CreateTable
CREATE TABLE "Pack" (
    "id" TEXT NOT NULL,
    "pic" TEXT NOT NULL,
    "grossWeight" DECIMAL(65,30) NOT NULL,
    "qtyA" DECIMAL(65,30) NOT NULL,
    "qtyB" DECIMAL(65,30) NOT NULL,
    "qtyC" DECIMAL(65,30) NOT NULL,
    "rejectedQty" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pack_pkey" PRIMARY KEY ("id")
);
