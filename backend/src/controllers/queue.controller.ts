const asynchandler = require("express-async-handler");
import moment from "moment-timezone";

import { $Enums } from "@prisma/client";
import {
  resetQueueOrder,
  addQueue,
  Specificqueue,
  getQueue,
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
    if (error.message === "full") {
      return res.status(400).json({ message: "ขออภัยคิววันนี้เต็มแล้ว" });
    }
  }
});

export const resetQueue = asynchandler(async (req: any, res: any) => {
  await resetQueueOrder();
  return res.status(200).send({ message: "Reset completed!" });
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
