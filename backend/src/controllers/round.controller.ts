const asynchandler = require('express-async-handler');
import moment from 'moment-timezone';


import { $Enums } from '@prisma/client';
import {getListOfRound,addListOfRound,editWebShowList,getAllDate,addRound} from '../services/round';


export const getAllListOfRound= asynchandler(async (req: any, res: any) => {
    const users = await getListOfRound();
    res.send(users);
  });

export const createListOfRound = asynchandler(async (req: any, res: any) => {
    const { year, semester } = req.body;
  
    // Validate input
    if (!year || !semester) {
    console.log("year, semester");
      return res.status(400).json({ message: "Year and semester are required." });
    }
  
    console.log(year, semester);
    const addlistofround = await addListOfRound({
      year: year,
      semester: semester,
    });
    res.status(200).send(addlistofround);
  });
  
  export const changeWebShowList = asynchandler(async (req: any, res: any) => {
    const { show_list } = req.body;
    const editwebshowlist = await editWebShowList({
        show_list: show_list,
    });
    res.status(200).send(editwebshowlist);
  });

  export const getDate= asynchandler(async (req: any, res: any) => {
    const days = await getAllDate();
    res.send(days);
  });

  export const createRound = asynchandler(async (req: any, res: any) => {
    const { startdate, enddate,type } = req.body;
  
    // Validate input
    if (!startdate || !enddate) {
      return res.status(400).json({ message: "startdate and enddate are required." });
    }
  
    console.log(startdate, enddate, type);
    const addround = await addRound({
      startdate: startdate,
      enddate: enddate,
      type: type,
    });
    res.status(200).send(addround);
  });