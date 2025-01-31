const asynchandler = require('express-async-handler');
import { Request, Response } from "express";
import { getDashboardData } from "../services/dashboard";

export const getDashboard = asynchandler(async (req: any, res: any) => {
  console.log("GET /getDashboard called");
  try {
    // Fetch the dashboard data
    const data = await getDashboardData();

    // Respond with the data
    res.status(200).json({
      success: true,
      message: "Dashboard data retrieved successfully",
      data,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);

    // Respond with an error
    res.status(500).json({
      success: false,
      message: "Failed to retrieve dashboard data",
    });
  }
});
