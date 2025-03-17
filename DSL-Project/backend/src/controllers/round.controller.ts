const asynchandler = require("express-async-handler");
import moment from "moment-timezone";

import { $Enums } from "@prisma/client";
import {
  getListOfRound,
  addListOfRound,
  editWebShowList,
  getAllDate,
  addRound,
  getAllRound,
  SpecificDate,
  deleteRound,
  TodayDate,
  RangeDate,
  editSpecificDate,
  webSettings,
  editwebSettings,
  DASDSettings,
  editDASDSettings,
} from "../services/round";

export const getAllListOfRound = asynchandler(async (req: any, res: any) => {
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

export const getDate = asynchandler(async (req: any, res: any) => {
  const days = await getAllDate();
  res.send(days);
});

export const createRound = asynchandler(async (req: any, res: any) => {
  const { startdate, enddate, type } = req.body;

  // Validate input
  if (!startdate || !enddate) {
    return res
      .status(400)
      .json({ message: "startdate and enddate are required." });
  }

  console.log(startdate, enddate, type);
  const addround = await addRound({
    startdate: startdate,
    enddate: enddate,
    type: type,
  });
  res.status(200).send(addround);
});

export const getRound = asynchandler(async (req: any, res: any) => {
  const rounds = await getAllRound();
  res.send(rounds);
});

export const getSpecificDate = asynchandler(async (req: any, res: any) => {
  const { roundid } = req.query;
  const SpecificDay = await SpecificDate({
    roundid: roundid,
  });
  res.status(200).send(SpecificDay);
});

export const DeleteRound = asynchandler(async (req: any, res: any) => {
  const { roundid } = req.query;
  const deleteround = await deleteRound({
    roundid: roundid,
  });
  res.status(200).send(deleteround);
});

export const getTodayDate = asynchandler(async (req: any, res: any) => {
  const currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0);
  const days = await TodayDate({
    date: currentDate.toISOString(),
  });
  res.send(days);
});

export const getRangeDate = asynchandler(async (req: any, res: any) => {
  const RangeDay = await RangeDate();
  res.status(200).send(RangeDay);
});



export const geteditSpecificDate = asynchandler(async (req: any, res: any) => {
  const { dateid, status,maxuser,starttime, endtime} = req.body;
  const editSpecificdate = await editSpecificDate({
    dateid: dateid,
    status: status,
    maxuser: maxuser,
    starttime: starttime,
    endtime: endtime,
  });
  res.status(200).send(editSpecificdate);
});


export const getwebSettings = asynchandler(async (req: any, res: any) => {
  const webSetting = await webSettings();
  res.send(webSetting);
});


export const geteditwebSettings = asynchandler(async (req: any, res: any) => {
  const { web_break_text, web_status} = req.body;
  const editwebSetting = await editwebSettings({
    web_break_text:web_break_text,
    web_status: web_status,
  });
  res.status(200).send(editwebSetting);
});

export const getDASDSettings = asynchandler(async (req: any, res: any) => {
  const DASDSetting = await DASDSettings();
  res.send(DASDSetting);
});


export const geteditDASDSettings = asynchandler(async (req: any, res: any) => {
  const { dasd_text} = req.body;
  const editDASDSetting = await editDASDSettings({
    dasd_text:dasd_text,
  });
  res.status(200).send(editDASDSetting);
});