import express from 'express';
import { Router } from "express";


import {useraddUser,usergetSpecificuser,usereditSpecificuser, addTeacher} from '../controllers/user.controller';

const usercontroller = require('../controllers/user.controller');

const router = express.Router();

router.get("/getAlluser",usercontroller.userlist);
router.post("/addUser",useraddUser);
router.get("/getSpecificuser",usergetSpecificuser)
router.put("/getusereditSpecificuser",usereditSpecificuser)
router.post("/addTeacher",addTeacher);

module.exports = router;