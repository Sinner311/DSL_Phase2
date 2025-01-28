import prisma from "../prisma/client";
import { history_booking, web_settings } from "@prisma/client";

export async function addBooking(history_booking: {
  studentid: number;
  type: number;
  bookingdateid: number;
  status: string;
}) {
  // ตรวจสอบการจองที่ซ้ำซ้อน
  const existingBooking = await prisma.history_booking.findFirst({
    where: {
      studentid: history_booking.studentid,
      status: "normal",
    },
  });

  if (existingBooking) {
    throw new Error("Active booking exists"); // ขว้าง Error หากพบการจองซ้ำ
  }

  // หากไม่มีการจองซ้ำ ให้สร้างรายการใหม่
  const res = await prisma.history_booking.create({ data: history_booking });
  return res;
}

export async function myBooking(studentid: number) {
  const studentidNumber = Number(studentid);
  if (isNaN(studentidNumber)) {
    throw new Error("Invalid student ID. Please provide a valid number.");
  }
  // ค้นหา history_booking โดยใช้ studentid และ status = "normal"
  const booking = await prisma.history_booking.findFirst({
    where: {
      studentid: studentidNumber,
      status: "normal",
    },
  });

  // ถ้าไม่มีข้อมูล ให้ส่งกลับ null
  if (!booking || !booking.bookingdateid) {
    return null;
  }

  // ใช้ bookingdateid จาก history_booking ไปค้นหาในตาราง days
  const dateInfo = await prisma.days.findUnique({
    where: {
      dateid: booking.bookingdateid, // ใช้ dateid ที่ได้จาก history_booking
    },
  });

  // ส่งข้อมูลของ dateid และ historyid กลับ
  return {
    historyid: booking.historyid,
    type: booking.type,
    dateid: dateInfo?.dateid,
    date: dateInfo?.date,
    starttime: dateInfo?.starttime,
    endtime: dateInfo?.endtime,
  };
}
