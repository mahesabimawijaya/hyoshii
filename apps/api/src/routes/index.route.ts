import express from "express";
import * as packController from "../controllers/index.controller";

const router = express.Router();

router.post("/", packController.createPack);
router.get("/", packController.findPacks);
router.get("/pic-reports", packController.getPicAccumulation);
router.get("/qty-reports", packController.getQtyAccumulation);
router.get("/productivity-reports", packController.getPicProductivity);
router.get("/gross-ratio-reports", packController.getGrossRatio);
router.get("/qty-ratio-reports", packController.getQtyRatio);

export default router;
