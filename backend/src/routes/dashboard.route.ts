import { Router } from "express";
import { getDashboard } from "../controllers/dashboard.controller";

const router = Router();

// Define the route for fetching dashboard data
router.get("/", getDashboard);

export default router;
