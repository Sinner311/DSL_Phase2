const asynchandler = require("express-async-handler");

import { $Enums } from "@prisma/client";
import { addBooking,myBooking,countBookingByDate,deleteBooking,RangeDateBooking } from "../services/booking";

export const makeBooking = asynchandler(async (req: any, res: any) => {
  const { id, type, dateid } = req.body;


  
  // Validate input
  if (!id || !type || !dateid) {
    return res.status(400).json({ message: "id dateid type are required." });
  }

  try {
    const addbooking = await addBooking({
      studentid: id,
      type: type,
      bookingdateid: dateid,
      status: "normal",
    });
    res.status(200).send(addbooking);
} catch (error: any) {
    // ดักจับข้อผิดพลาด
    if (error.message === "Active booking exists") {
      return res.status(400).json({ message: "คุณมีรายการจองอยู่แล้ว" });
    }

    console.error("Error adding booking:", error);
    res.status(500).json({ message: "An error occurred while making the booking." });
  }
});

export const getmyBooking = asynchandler(async (req: any, res: any) => {
    const { studentid } = req.query;
  
    // ตรวจสอบว่ามี studentid ในคำขอหรือไม่
    if (!studentid) {
      return res.status(400).json({ message: "studentid is required." });
    }
  
    try {
      // เรียกฟังก์ชัน myBooking และส่ง studentid เข้าไป
      const bookingInfo = await myBooking(studentid);
  
      // ส่งผลลัพธ์กลับ
      res.status(200).send(bookingInfo);
    } catch (error) {
      console.error("Error fetching booking info:", error);
      res.status(500).json({ message: "Failed to fetch booking info." });
    }
  });
  

  
  export const getcountBookingByDate = asynchandler(async (req: any, res: any) => {
    const { dateid } = req.query;
  
    if (!dateid) {
      return res.status(400).json({ message: "dateid is required." });
    }
  
    try {
      const countBooking = await countBookingByDate(dateid);
      res.status(200).json(countBooking); // เปลี่ยนเป็น .json() เพื่อให้ JSON response ถูกต้อง
    } catch (error) {
      console.error("Error fetching count booking:", error);
      res.status(500).json({ message: "Failed to fetch count booking." });
    }
  });
  

  export const DeleteBooking = asynchandler(async (req: any, res: any) => {
    try {
      const { historyid } = req.query;
  
      // ตรวจสอบว่าได้รับ historyid มาหรือไม่
      console.log(historyid)
      if (!historyid) {
        return res.status(400).json({ message: "ต้องระบุ historyid" });
      }
  
      const deletebooking = await deleteBooking({ historyid: Number(historyid) });
  
      res.status(200).send(deletebooking);
    } catch (error) {
      console.error("Error deleting booking:", error);
      res.status(500).json({ message: "เกิดข้อผิดพลาดในการยกเลิกการจอง" });
    }
  });

  
  export const getRangeDateBooking = asynchandler(async (req: any, res: any) => {
    const RangeDayBooking = await RangeDateBooking();
    res.status(200).send(RangeDayBooking);
  });