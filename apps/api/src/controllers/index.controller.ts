import { Request, Response } from "express";
import * as packService from "../services/index.service";

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

    // Group data by time and format the response
    const chartData = rawData.reduce((acc: any[], curr) => {
      const existingEntry = acc.find((item) => item.time.toISOString() === curr.time.toISOString());

      if (existingEntry) {
        existingEntry[curr.pic] = curr.totalQty;
      } else {
        acc.push({
          time: curr.time,
          [curr.pic]: curr.totalQty,
        });
      }

      return acc;
    }, []);

    return res.status(200).json(chartData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getQtyAccumulation(req: Request, res: Response): Promise<any> {
  try {
    const chartData = await packService.getQtyAccumulation();
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

    // Group data by time and format the response
    const chartData = rawData.reduce((acc: any[], curr) => {
      const existingEntry = acc.find((item) => item.time.toISOString() === curr.time.toISOString());

      if (existingEntry) {
        existingEntry[curr.pic] = curr.totalQty;
      } else {
        acc.push({
          time: curr.time,
          [curr.pic]: curr.totalQty,
        });
      }

      return acc;
    }, []);

    return res.status(200).json(chartData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getGrossRatio(req: Request, res: Response): Promise<any> {
  try {
    const type = (req.query.type as "day" | "hour") ?? "hour";
    const chartData = await packService.getGrossRatio(type);
    return res.status(200).json(chartData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getQtyRatio(req: Request, res: Response): Promise<any> {
  try {
    const type = (req.query.type as "day" | "hour") ?? "hour";
    const chartData = await packService.getQtyRatio(type);
    return res.status(200).json(chartData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
