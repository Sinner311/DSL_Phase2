import { Request, Response } from "express";
import { getTVdata } from "../services/tv-service"; // Assuming we move logic to a service file

/**
 * Controller to get TV dashboard data
 */
export const getTVDataController = async (req: any, res: any) => {
  try {
    const data = await getTVdata();
    return res.status(200).json({
      success: true,
      message: "TV data fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Error in getTVDataController:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch TV data",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
