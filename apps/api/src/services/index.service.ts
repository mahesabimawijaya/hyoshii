import { Pack } from "@prisma/client";
import prisma from "./prisma.service";

export async function createPack(pack: any): Promise<any> {
  return await prisma.pack.create({ data: pack });
}

export async function findPacks(): Promise<Pack[]> {
  return await prisma.pack.findMany();
}

export async function getPicAccumulation() {
  const result = await prisma.$queryRaw<
    Array<{
      pic: string;
      totalQty: number;
      time: Date;
    }>
  >`
SELECT
      pic,
      SUM("qtyA" + "qtyB" + "qtyC") AS "totalQty",
      DATE_TRUNC('hour', "createdAt") AS "time"
    FROM "Pack"
    GROUP BY pic, DATE_TRUNC('hour', "createdAt")
    ORDER BY "time";
  `;

  return result;
}

export async function getQtyAccumulation() {
  const result = await prisma.$queryRaw<
    Array<{
      qtyA: number;
      qtyB: number;
      qtyC: number;
      time: Date;
    }>
  >`
    SELECT
      SUM("qtyA") AS "qtyA",
      SUM("qtyB") AS "qtyB",
      SUM("qtyC") AS "qtyC",
      DATE_TRUNC('hour', "createdAt") AS "time"
    FROM "Pack"
    GROUP BY DATE_TRUNC('hour', "createdAt")
    ORDER BY "time";
  `;

  return result;
}

export async function getPicProductivity(type: "day" | "hour") {
  const result =
    type === "hour"
      ? await prisma.$queryRaw<
          Array<{
            pic: string;
            totalQty: number;
            time: Date;
          }>
        >`
SELECT
      pic,
      ROUND(SUM("qtyA" + "qtyB" + "qtyC") / 60, 2) AS "totalQty",
      DATE_TRUNC('hour', "createdAt") AS "time"
    FROM "Pack"
    GROUP BY pic, DATE_TRUNC('hour', "createdAt")
    ORDER BY "time";
  `
      : await prisma.$queryRaw<
          Array<{
            pic: string;
            totalQty: number;
            time: Date;
          }>
        >`
SELECT
      pic,
      ROUND(SUM("qtyA" + "qtyB" + "qtyC") / 600, 2) AS "totalQty",
      DATE_TRUNC('day', "createdAt") AS "time"
    FROM "Pack"
    GROUP BY pic, DATE_TRUNC('day', "createdAt")
    ORDER BY "time";
  `;

  return result;
}

export async function getGrossRatio(type: "day" | "hour") {
  const result =
    type === "hour"
      ? await prisma.$queryRaw<
          Array<{
            ratio: number;
            time: Date;
          }>
        >`
    SELECT
      ROUND(
        CASE
          WHEN SUM("grossWeight") = 0 THEN 0
          ELSE (SUM("rejectedQty") / SUM("grossWeight")) * 100
        END,
        2
      ) AS "ratio",
      DATE_TRUNC('hour', "createdAt") AS "time"
    FROM "Pack"
    GROUP BY DATE_TRUNC('hour', "createdAt")
    ORDER BY "time";
  `
      : await prisma.$queryRaw<
          Array<{
            ratio: number;
            time: Date;
          }>
        >`
    SELECT
      ROUND(
        CASE
          WHEN SUM("grossWeight") = 0 THEN 0
          ELSE (SUM("rejectedQty") / SUM("grossWeight")) * 100
        END,
        2
      ) AS "ratio",
      DATE_TRUNC('day', "createdAt") AS "time"
    FROM "Pack"
    GROUP BY DATE_TRUNC('day', "createdAt")
    ORDER BY "time";
  `;

  return result;
}

export async function getQtyRatio(type: "day" | "hour") {
  const result =
    type === "hour"
      ? await prisma.$queryRaw<
          Array<{
            qtyA: number;
            qtyB: number;
            qtyC: number;
            time: Date;
          }>
        >`
    SELECT
      ROUND(
        CASE
          WHEN SUM("qtyA" + "qtyB" + "qtyC") = 0 THEN 0
          ELSE (SUM("qtyA") / SUM("qtyA" + "qtyB" + "qtyC")) * 100
        END,
        2
      ) AS "qtyA",
      ROUND(
        CASE
          WHEN SUM("qtyA" + "qtyB" + "qtyC") = 0 THEN 0
          ELSE (SUM("qtyB") / SUM("qtyA" + "qtyB" + "qtyC")) * 100
        END,
        2
      ) AS "qtyB",
      ROUND(
        CASE
          WHEN SUM("qtyA" + "qtyB" + "qtyC") = 0 THEN 0
          ELSE (SUM("qtyC") / SUM("qtyA" + "qtyB" + "qtyC")) * 100
        END,
        2
      ) AS "qtyC",
      DATE_TRUNC('hour', "createdAt") AS "time"
    FROM "Pack"
    GROUP BY DATE_TRUNC('hour', "createdAt")
    ORDER BY "time";
  `
      : await prisma.$queryRaw<
          Array<{
            qtyA: number;
            qtyB: number;
            qtyC: number;
            time: Date;
          }>
        >`
    SELECT
      ROUND(
        CASE
          WHEN SUM("qtyA" + "qtyB" + "qtyC") = 0 THEN 0
          ELSE (SUM("qtyA") / SUM("qtyA" + "qtyB" + "qtyC")) * 100
        END,
        2
      ) AS "qtyA",
      ROUND(
        CASE
          WHEN SUM("qtyA" + "qtyB" + "qtyC") = 0 THEN 0
          ELSE (SUM("qtyB") / SUM("qtyA" + "qtyB" + "qtyC")) * 100
        END,
        2
      ) AS "qtyB",
      ROUND(
        CASE
          WHEN SUM("qtyA" + "qtyB" + "qtyC") = 0 THEN 0
          ELSE (SUM("qtyC") / SUM("qtyA" + "qtyB" + "qtyC")) * 100
        END,
        2
      ) AS "qtyC",
      DATE_TRUNC('day', "createdAt") AS "time"
    FROM "Pack"
    GROUP BY DATE_TRUNC('day', "createdAt")
    ORDER BY "time";
  `;

  return result;
}
