import { Request, Response } from "express";
import * as packService from "../services/index.service";
import { time } from "console";

export async function createPack(req: Request, res: Response): Promise<any> {
  try {
    const { pic, grossWeight, qtyA, qtyB, qtyC, rejectedQty, createdAt } = req.body;

    if (pic == null || grossWeight == null || qtyA == null || qtyB == null || qtyC == null || rejectedQty == null) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const formattedDate = createdAt ? new Date(createdAt).toISOString() : "";

    const pack = await packService.createPack({
      pic,
      grossWeight,
      qtyA,
      qtyB,
      qtyC,
      rejectedQty,
      createdAt: formattedDate,
    });
    return res.status(201).json({ message: "Pack created successfully", data: pack });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function findPacks(req: Request, res: Response): Promise<any> {
  try {
    const packs = await packService.findPacks();
    return res.status(200).json({ message: "Packs fetched successfully", data: packs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getPicAccumulation(req: Request, res: Response): Promise<any> {
  try {
    const rawData = await packService.getPicAccumulation();

    // Step 1: Extract unique PIC names and timestamps
    const allPics = Array.from(new Set(rawData.map((entry) => entry.pic)));
    const allTimes = Array.from(new Set(rawData.map((entry) => entry.time.toISOString())));

    // Step 2: Fill missing records
    const filledData = allTimes.map((time) => {
      const formattedTime = new Date(time).toLocaleString("id-ID", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      // Create an object with all PICs initialized to 0
      const timeEntry: Record<string, any> = { time: formattedTime };
      allPics.forEach((pic) => {
        timeEntry[pic] = 0; // Default to 0
      });

      // Fill in actual data for this time
      rawData
        .filter((entry) => entry.time.toISOString() === time)
        .forEach((entry) => {
          timeEntry[entry.pic] = entry.totalQty;
        });

      return timeEntry;
    });

    return res.status(200).json(filledData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getQtyAccumulation(req: Request, res: Response): Promise<any> {
  try {
    const rawData = await packService.getQtyAccumulation();
    const chartData = rawData.map((item) => ({
      QtyA: item.QtyA,
      QtyB: item.QtyB,
      QtyC: item.QtyC,
      time: item.time.toLocaleString("id-ID", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    }));

    return res.status(200).json(chartData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getPicProductivity(req: Request, res: Response): Promise<any> {
  try {
    const type = (req.query.type as "day" | "hour") ?? "hour";
    const rawData = await packService.getPicProductivity(type);

    // Step 1: Extract unique PIC names and timestamps
    const allPics = Array.from(new Set(rawData.map((entry) => entry.pic)));
    const allTimes = Array.from(new Set(rawData.map((entry) => entry.time.toISOString())));

    // Step 2: Fill missing records
    const filledData = allTimes.map((time) => {
      const formattedTime = new Date(time).toLocaleString("id-ID", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      // Create an object with all PICs initialized to 0
      const timeEntry: Record<string, any> = { time: formattedTime };
      allPics.forEach((pic) => {
        timeEntry[pic] = 0; // Default to 0
      });

      // Fill in actual data for this time
      rawData
        .filter((entry) => entry.time.toISOString() === time)
        .forEach((entry) => {
          timeEntry[entry.pic] = entry.totalQty;
        });

      return timeEntry;
    });

    return res.status(200).json(filledData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getGrossRatio(req: Request, res: Response): Promise<any> {
  try {
    const type = (req.query.type as "day" | "hour") ?? "hour";
    const rawData = await packService.getGrossRatio(type);
    const chartData = rawData.map((item) => ({
      reject: item.reject,
      time: item.time.toLocaleString("id-ID", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    }));

    return res.status(200).json(chartData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getQtyRatio(req: Request, res: Response): Promise<any> {
  try {
    const type = (req.query.type as "day" | "hour") ?? "hour";
    const rawData = await packService.getQtyRatio(type);
    const chartData = rawData.map((item) => ({
      QtyA: item.QtyA,
      QtyB: item.QtyB,
      QtyC: item.QtyC,
      time: item.time.toLocaleString("id-ID", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    }));
    return res.status(200).json(chartData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
