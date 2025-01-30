import express from 'express';

import {queueaddQueue,getSpecificqueue,getAllQueue} from '../controllers/queue.controller';

const router = express.Router();


router.post("/getqueueaddQueue",queueaddQueue)
router.get("/getSpecificqueue",getSpecificqueue)
router.get("/getAllQueue",getAllQueue);

module.exports = router;