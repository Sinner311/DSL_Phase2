const asynchandler = require('express-async-handler');
import { Request, Response } from "express";
import { getHistoryQueueData } from "../services/review";

export const formattedData = asynchandler(async (req: any, res: any) => {
    console.log("GET /getHistoryQueueData called");
    try {
      // Fetch the dashboard data
      const data = await getHistoryQueueData();
  
      // Respond with the data
      res.status(200).json({
        success: true,
        message: "HistoryQueue data retrieved successfully",
        data,
      });
    } catch (error) {
      console.error("Error fetching HistoryQueue data:", error);
  
      // Respond with an error
      res.status(500).json({
        success: false,
        message: "Failed to retrieve HistoryQueue data",
      });
    }
  });