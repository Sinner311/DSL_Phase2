import { Request, Response } from "express";
import { getHistoryQueueData } from "../services/review";
const asynchandler = require('express-async-handler');

// Controller to handle fetching and formatting history queue data
export const formattedData = asynchandler(async (req: Request, res: Response) => {
    console.log("GET /getHistoryQueueData called");

    try {
        // Fetch the history queue data from the service
        const data = await getHistoryQueueData();

        // Send the response with the formatted data
        res.status(200).json({
            success: true,
            message: "HistoryQueue data retrieved successfully",
            data,
        });
    } catch (error) {
        console.error("Error fetching HistoryQueue data:", error);

        // Error response
        res.status(500).json({
            success: false,
            message: "Failed to retrieve HistoryQueue data",
        });
    }
});