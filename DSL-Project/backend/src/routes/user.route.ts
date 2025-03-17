import express from 'express';
import { Router } from "express";


import {useraddUser,usergetSpecificuser,usereditSpecificuser, addAdmin , admingetStaff} from '../controllers/user.controller';

const usercontroller = require('../controllers/user.controller');

const router = express.Router();

router.get("/getAlluser",usercontroller.userlist);
router.post("/addUser",useraddUser);
router.get("/getSpecificuser",usergetSpecificuser)
router.put("/getusereditSpecificuser",usereditSpecificuser)
router.post("/addAdmin",addAdmin);

router.get("/getAllstaff",admingetStaff);

router.get("/getcurrentdate", (req, res) => {
    const currentDate = new Date();  
    // ตั้งค่าเวลาเป็น 00:00:00.000 UTC
    currentDate.setUTCHours(0, 0, 0, 0);
    res.status(200).send({
        "dates": currentDate.toISOString()
    });
});
module.exports = router;