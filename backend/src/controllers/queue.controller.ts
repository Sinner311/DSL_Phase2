const asynchandler = require("express-async-handler");
import moment from "moment-timezone";

import { $Enums } from "@prisma/client";
import {

  addQueue,
  Specificqueue,
  getQueue,
  getStaffQueue,
  EditQueue,
  FinishQueue,
  getDashboardData,
  getTVdata,
  getCallQueue,
} from "../services/queue";

export const queueaddQueue = asynchandler(async (req: any, res: any) => {
  const { studentid, type } = req.body;
  const currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0);

  try {
    const getqueueaddQueue = await addQueue({
      studentid: studentid,
      type: type,
      date: currentDate.toISOString(),
    });
    res.status(200).send(getqueueaddQueue);
  } catch (error: any) {
    // ดักจับข้อผิดพลาด
    if (error.message === "close") {
      return res.status(400).json({ message: "ระบบคิวเปิดระหว่างเวลา 07:00 น. ถึง 16:00 น. เท่านั้น" });
    }
    if (error.message === "inqueue") {
      return res.status(400).json({ message: "ขออภัยคุณอยู่ในคิวอยู่แล้ว" });
    }
  }
});


export const getSpecificqueue = asynchandler(async (req: any, res: any) => {
  const { studentid } = req.query;
  const getusergetSpecificqueue = await Specificqueue({
    studentid: studentid,
  });
  res.status(200).send(getusergetSpecificqueue);
});

export const getAllQueue = asynchandler(async (req: any, res: any) => {
  const AllQueue = await getQueue();
  res.send(AllQueue);
});


export const getAllStaffQueue = asynchandler(async (req: any, res: any) => {
  const AllQueue = await getStaffQueue();
  res.send(AllQueue);
});


export const getEditQueue = asynchandler(async (req: any, res: any) => {
  const { queueid,channel,status} = req.body;
  const editQueue = await EditQueue({
    queueid: queueid,
    channel: channel,
    status: status,
  });
  res.status(200).send(editQueue);
});


export const getFinishQueue = asynchandler(async (req: any, res: any) => {
  const { queueid,channel,status,studentid,type} = req.body;
  const finishQueue = await FinishQueue({
    queueid: queueid,
    channel: channel,
    studentid:studentid,
    status: status,
    type:type,
  });
  res.status(200).send(finishQueue);
});

export const getDashboard = asynchandler(async (req: any, res: any) => {
  console.log("GET /getDashboard called");
  try {
    // Fetch the dashboard data
    const data = await getDashboardData();

    // Respond with the data
    res.status(200).json({
      success: true,
      message: "Dashboard data retrieved successfully",
      data,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);

    // Respond with an error
    res.status(500).json({
      success: false,
      message: "Failed to retrieve dashboard data",
    });
  }
});


export const getTVDataController = async (req: any, res: any) => {
  try {
    const data = await getTVdata();
    return res.status(200).json({
      success: true,
      message: "TV data fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Error in getTVDataController:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch TV data",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};




export const getAllCallQueue = asynchandler(async (req: any, res: any) => {
  const AllQueue = await getCallQueue();
  res.send(AllQueue);
});