import express from 'express';

import {getSpecifichistory,sendreview,mynotreview} from '../controllers/history.controller';
import { getHistoryQueueData } from "../services/history";
const router = express.Router();

router.get("/getSpecifichistory",getSpecifichistory)
router.get("/getHistoryQueueData", async (req, res) => {
    try {
        const data = await getHistoryQueueData(); // Call the service to fetch the data
        res.status(200).json(data); // Return the data as JSON in the response
    } catch (error) {
        console.error("Error fetching history queue data:", error);
        res.status(500).json({ error: "Failed to fetch history queue data" }); // Error handling
    }
});
router.put("/sendreview",sendreview)
router.get("/mynotreview",mynotreview)




module.exports = router;

