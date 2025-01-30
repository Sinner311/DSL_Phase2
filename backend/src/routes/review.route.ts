import express from "express";
import { formattedData  } from "../controllers/review.controller";

const router = express.Router();

router.get("/getHistoryQueueData ", formattedData ); // 👈 Make sure this is correctly defined

export default router;
