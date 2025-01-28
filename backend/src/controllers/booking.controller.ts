const asynchandler = require("express-async-handler");

import { $Enums } from "@prisma/client";
import { addBooking,myBooking } from "../services/booking";

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
  