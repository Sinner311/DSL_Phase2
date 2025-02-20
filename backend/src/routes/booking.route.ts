import express from 'express';

import {makeBooking,getmyBooking,getcountBookingByDate,DeleteBooking,getRangeDateBooking} from '../controllers/booking.controller';

const router = express.Router();

router.post("/makebooking",makeBooking);
router.get("/getmyBooking",getmyBooking);
router.get("/getcountBookingByDate",getcountBookingByDate)
router.delete("/DeleteBooking",DeleteBooking)
router.get("/getRangeDateBooking", getRangeDateBooking);




module.exports = router;