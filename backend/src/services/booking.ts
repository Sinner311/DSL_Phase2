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
    throw new Error("Active booking exists");
  }

  // ดึงค่า maxuser ของวันนั้น
  const dayInfo = await prisma.days.findUnique({
    where: { dateid: history_booking.bookingdateid },
    select: { maxuser: true },
  });

  if (!dayInfo || dayInfo.maxuser === null) {
    throw new Error("Invalid booking date or maxuser not set");
  }

  const maxType1 = Math.floor(dayInfo.maxuser / 3); // 1/3 ของ maxuser
  const maxType2 = dayInfo.maxuser - maxType1; // 2/3 ของ maxuser

  // นับจำนวนการจองของแต่ละ type
  const countType1 = await prisma.history_booking.count({
    where: { bookingdateid: history_booking.bookingdateid, type: 1 },
  });

  const countType2 = await prisma.history_booking.count({
    where: { bookingdateid: history_booking.bookingdateid, type: 2 },
  });

  // ตรวจสอบว่าประเภทการจองเกินลิมิตหรือไม่
  if (history_booking.type === 1 && countType1 >= maxType1) {
    throw new Error(`Booking limit reached for type 1 (max ${maxType1})`);
  }

  if (history_booking.type === 2 && countType2 >= maxType2) {
    throw new Error(`Booking limit reached for type 2 (max ${maxType2})`);
  }

  // หากยังไม่เต็ม ให้สร้างรายการใหม่
  return await prisma.history_booking.create({ data: history_booking });
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

export async function countBookingByDate(dateid: number) {
  const dateidNumber = Number(dateid);
  if (isNaN(dateidNumber)) {
    throw new Error("Invalid DateID. Please provide a valid number.");
  }

  // ใช้ count() เพื่อนับจำนวนการจองที่มี bookingdateid ตรงกับ dateid
  const bookingCount = await prisma.history_booking.count({
    where: {
      bookingdateid: dateidNumber,
    },
  });

  return { total: bookingCount };
}

export async function deleteBooking({ historyid }: { historyid: number }) {
  try {
    // ตรวจสอบก่อนว่ามีการจองนี้อยู่หรือไม่
    const existingBooking = await prisma.history_booking.findUnique({
      where: {
        historyid: historyid,
      },
    });

    if (!existingBooking) {
      throw new Error("ไม่พบข้อมูลการจองนี้");
    }

    await prisma.history_booking.delete({
      where: {
        historyid: historyid,
      },
    });

    return { message: "ยกเลิกการจองสำเร็จแล้ว" };
  } catch (error) {
    console.error("Error in deleteBooking:", error);
    throw new Error("ไม่สามารถยกเลิกการจองได้");
  }
}
