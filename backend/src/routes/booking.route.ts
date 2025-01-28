import express from 'express';

import {makeBooking,getmyBooking} from '../controllers/booking.controller';

const router = express.Router();

router.post("/makebooking",makeBooking);
router.get("/getmyBooking",getmyBooking)



module.exports = router;