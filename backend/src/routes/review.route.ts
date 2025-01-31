import express from "express";
import { getHistoryQueueData } from "../services/review"; // Make sure the service is correct

const router = express.Router();

// Route to fetch the history queue data
router.get("/getHistoryQueueData", async (req, res) => {
    try {
        const data = await getHistoryQueueData(); // Call the service to fetch the data
        res.status(200).json(data); // Return the data as JSON in the response
    } catch (error) {
        console.error("Error fetching history queue data:", error);
        res.status(500).json({ error: "Failed to fetch history queue data" }); // Error handling
    }
});

export default router;