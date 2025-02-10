const asynchandler = require("express-async-handler");
import moment from "moment-timezone";

import { $Enums } from "@prisma/client";
import {
  Specifichistory,
  getreview,
  getmynotreview,
} from "../services/history";

export const getSpecifichistory = asynchandler(async (req: any, res: any) => {
  const { studentid } = req.query;
  const getusergetSpecifichistory = await  Specifichistory({
    studentid: studentid,
  });
  res.status(200).send(getusergetSpecifichistory);
});


export const sendreview = asynchandler(async (req: any, res: any) => {
  try {
    const { studentid, star_rate} = req.body;

    // เรียกใช้ฟังก์ชัน getreview เพื่ออัปเดตข้อมูล
    const review = await getreview({
      studentid: studentid,
      star_rate: star_rate,

    });

    // ส่งข้อมูลกลับไปยัง client
    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There was an error processing your request." });
  }
});


export const mynotreview = asynchandler(async (req: any, res: any) => {
  try {

    // เรียกใช้ฟังก์ชัน getreview เพื่ออัปเดตข้อมูล
    const review = await getmynotreview();

    // ส่งข้อมูลกลับไปยัง client
    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There was an error processing your request." });
  }
});