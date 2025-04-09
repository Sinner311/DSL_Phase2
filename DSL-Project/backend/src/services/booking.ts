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


 // ดึงค่า maxuser ของวันนั้น
 const dayInfo = await prisma.days.findUnique({
  where: { dateid: history_booking.bookingdateid },
  select: { maxuser: true ,roundid1: true, roundid2: true},
});

if (!dayInfo || dayInfo.maxuser === null) {
  throw new Error("Invalid booking date or maxuser not set");
}

//ตรวจสอบว่าวันที่จองมีประเภทที่เลือกจริง ๆ หรือไม่
if (history_booking.type === 1 && dayInfo.roundid1 === null) {
  throw new Error("Booking type 1 is not available for this date.");
}

if (history_booking.type === 2 && dayInfo.roundid2 === null) {
  throw new Error("Booking type 2 is not available for this date.");
}


const maxpercentage = dayInfo.roundid1 !== null && dayInfo.roundid2 !== null;

if (maxpercentage) {
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
} else {
  const bookingCount = await prisma.history_booking.count({
    where: {
      bookingdateid: history_booking.bookingdateid,
    },
  });

  if (bookingCount >= dayInfo.maxuser) {
    throw new Error(`Booking limit reached (max ${dayInfo.maxuser})`);
  }
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

export async function countBookingByDate(dateid: number) {
  const dateidNumber = Number(dateid);
  if (isNaN(dateidNumber)) {
    throw new Error("Invalid DateID. Please provide a valid number.");
  }

  // ดึงข้อมูลของ days ตาม dateid เพื่อตรวจสอบค่า roundid1 และ roundid2
  const dayRecord = await prisma.days.findUnique({
    where: { dateid: dateidNumber },
    select: { roundid1: true, roundid2: true },
  });

  if (!dayRecord) {
    throw new Error("No record found for the given DateID.");
  }

  // ตรวจสอบว่า roundid1 และ roundid2 มีค่าทั้งคู่หรือไม่
  const maxpercentage = dayRecord.roundid1 !== null && dayRecord.roundid2 !== null;

  // นับจำนวนการจองตาม type 1 และ type 2
  const bookingCount1 = await prisma.history_booking.count({
    where: {
      bookingdateid: dateidNumber,
      type: 1,
    },
  });

  const bookingCount2 = await prisma.history_booking.count({
    where: {
      bookingdateid: dateidNumber,
      type: 2,
    },
  });

  return { maxpercentage, total1: bookingCount1, total2: bookingCount2 };
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


export async function RangeDateBooking() { 
  const webSettings = await prisma.web_settings.findUnique({
    where: {
      id: 1,
    },
    select: {
      show_list: true,
    },
  });

  if (!webSettings || !webSettings.show_list) {
    throw new Error("Unable to find show_list from web_settings with id = 1.");
  }

  const showList = webSettings.show_list;

  const rounds = await prisma.rounds.findMany({
    where: {
      Listid: showList,
    },
    select: {
      roundid: true,
    },
  });
  const roundList = rounds.map((r) => r.roundid);
  
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // ดึงข้อมูลวันที่จากตาราง days พร้อม starttime และ endtime
  const days = await prisma.days.findMany({
    where: {
      OR: [{ roundid1: { in: roundList } }, { roundid2: { in: roundList } }],
      date: {
        gt: yesterday,
      },
    },
    orderBy: {
      date: 'asc',
    },
    select: {
      dateid: true,
      date: true,
      maxuser: true,
      starttime: true, // เพิ่ม starttime
      endtime: true,   // เพิ่ม endtime
      // ดึงข้อมูลการจองของแต่ละวัน
      history_booking: {
        select: {
          type: true,
          status: true,
          users: {
            select: {
              studentid: true, // รหัสนักศึกษา (จากตาราง users)
              name: true, // ชื่อ (จากตาราง users)
            },
          },
        },
      },
    },
  });

  // จัดรูปแบบข้อมูลให้เหมาะสม
  const formattedData = days.map((day) => ({
    dateid: day.dateid,
    date: day.date,
    starttime: day.starttime, // เพิ่ม starttime
    endtime: day.endtime,     // เพิ่ม endtime
    maxuser: day.maxuser,
    bookingCount: day.history_booking.length, // จำนวนการจองของวันนั้น
    bookings: day.history_booking.map((booking) => ({
      studentid: booking.users?.studentid || "N/A", // ป้องกันกรณีไม่มีข้อมูลนักศึกษา
      name: booking.users?.name || "ไม่ทราบชื่อ", // ถ้าไม่มีชื่อให้ใส่ค่ากลาง
      type: booking.type,
      status: booking.status,
    })),
  }));

  return formattedData;
}



export async function autoDeletePastBooking() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // กำหนดให้เริ่มต้นวันเวลาเป็น 00:00:00

  try {
    // ค้นหารายการที่ bookingdateid < วันนี้ และยังไม่ได้ถูกยกเลิก
    const expiredBookings = await prisma.history_booking.findMany({
      where: {
        days: {
          date: { lt: today }, // ตรวจสอบว่า bookingdateid น้อยกว่าวันนี้
        },
        status: { notIn: ["cancel", "finish"] }, // ไม่ใช่รายการที่ถูกยกเลิกแล้ว
      },
    });

    if (expiredBookings.length > 0) {
      // อัปเดตสถานะของการจองที่หมดอายุเป็น "cancel"
      await prisma.history_booking.updateMany({
        where: {
          historyid: { in: expiredBookings.map((b) => b.historyid) },
        },
        data: { status: "cancel" },
      });

      console.log(`ยกเลิกการจองทั้งหมด ${expiredBookings.length} รายการ`);
    } else {
      console.log("ไม่มีการจองที่ต้องยกเลิก");
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการอัปเดตสถานะการจอง:", error);
  } finally {
    await prisma.$disconnect();
  }
}


