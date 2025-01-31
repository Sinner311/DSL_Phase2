import express from 'express';
import { getTVDataController } from "../controllers/tv.controller";

const router = express.Router();

router.get("/tv-data", getTVDataController);

export default router;
