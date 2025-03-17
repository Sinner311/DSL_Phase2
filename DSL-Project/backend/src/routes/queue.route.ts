import express from 'express';

import {queueaddQueue,getSpecificqueue,getAllQueue,getAllStaffQueue,getEditQueue,getFinishQueue,getDashboard,getTVDataController,getAllCallQueue} from '../controllers/queue.controller';

const router = express.Router();


router.post("/getqueueaddQueue",queueaddQueue)
router.get("/getSpecificqueue",getSpecificqueue)
router.get("/getAllQueue",getAllQueue);
router.get("/getAllCallQueue",getAllCallQueue);
router.get("/getAllStaffQueue",getAllStaffQueue)
router.put("/getEditQueue",getEditQueue)
router.post("/getFinishQueue",getFinishQueue)
router.get("/getDashboard", getDashboard);
router.get("/tv-data", getTVDataController);

module.exports = router;