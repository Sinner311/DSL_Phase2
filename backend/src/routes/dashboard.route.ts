import express from "express";
import { getDashboard } from "../controllers/dashboard.controller";

const router = express.Router();

router.get("/getDashboard", getDashboard); // 👈 Make sure this is correctly defined

export default router;
