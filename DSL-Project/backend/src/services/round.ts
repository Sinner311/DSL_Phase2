import prisma from "../prisma/client";
import { list_of_round, web_settings } from "@prisma/client";

export async function getListOfRound() {
  return await prisma.list_of_round.findMany();
}

export async function addListOfRound(list_of_round: {
  year: number;
  semester: number;
}) {
  const res = await prisma.list_of_round.create({ data: list_of_round });
  return res;
}

export async function editWebShowList(list_of_round: { show_list: string }) {
  console.log(list_of_round.show_list);
  const update_showlistofround = await prisma.web_settings.update({
    where: {
      id: 1, // ระบุ id ของ record ที่ต้องการอัปเดต
    },
    data: {
      show_list: parseInt(list_of_round.show_list), // อัปเดตค่าของ show_list
    },
  });
  return update_showlistofround;
}

export async function autoCreateDay() {
  // Get today's date and set it to the start of the day
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of the day

  // Set the target end date (12 months from today)
  const endDate = new Date(today);
  endDate.setMonth(endDate.getMonth() + 12);

  // Loop through each day from today to the end date
  for (
    let currentDate = new Date(today);
    currentDate <= endDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    // Skip weekends (Saturday: 6, Sunday: 0)
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      continue; // Skip Saturdays and Sundays
    }

    // Check if the date already exists in the database
    const existingDay = await prisma.days.findFirst({
      where: {
        date: new Date(currentDate.setHours(7, 0, 0)),
      },
    });
    // console.log(existingDay,currentDate)
    // If the date does not exist, create it
    if (!existingDay) {
      await prisma.days.create({
        data: {
          date: currentDate,
          status: "normal", // คุณสามารถกำหนดค่าอื่นๆ ได้ตามต้องการ
          maxuser: 400, // ตัวอย่าง: จำนวนผู้ใช้สูงสุด
          starttime: new Date(currentDate.setHours(15, 30, 0)), // ตัวอย่าง: เวลาเริ่มต้น 9:00 AM
          endtime: new Date(currentDate.setHours(23, 0, 0)), // ตัวอย่าง: เวลาสิ้นสุด 5:00 PM
        },
      });
    }
  }

  console.log("Days have been auto update!");
}

export async function getAllDate() {
  return await prisma.days.findMany();
}

export async function addRound(rounds: {
  startdate: string;
  enddate: string;
  type: number;
}) {
  // Get the show_list (Listid) from web_settings where id = 1
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

  const Listid = webSettings.show_list;

  // Check if any day in the range startdate to enddate has conflicting roundid
  const conflictingDays = await prisma.days.findMany({
    where: {
      date: {
        gte: new Date(rounds.startdate), // Greater than or equal to startdate
        lte: new Date(rounds.enddate), // Less than or equal to enddate
      },
      ...(rounds.type === 1
        ? { roundid1: { not: null } } // Check roundid1 for type 1
        : { roundid2: { not: null } }), // Check roundid2 for type 2
    },
  });

  if (conflictingDays.length > 0) {
    throw new Error(
      `Cannot add round. There are ${
        conflictingDays.length
      } days in the range with non-null ${
        rounds.type === 1 ? "roundid1" : "roundid2"
      } values.`
    );
  }

  // Count existing rounds with the same Listid and type
  const existingRoundsCount = await prisma.rounds.count({
    where: {
      Listid: Listid,
      type: rounds.type,
    },
  });

  // Create the round with the retrieved Listid and calculated roundnumber
  const newRound = await prisma.rounds.create({
    data: {
      Listid: Listid,
      startdate: new Date(rounds.startdate), // Convert string to Date object
      enddate: new Date(rounds.enddate), // Convert string to Date object
      status: "normal",
      roundnumber: existingRoundsCount + 1, // Increment the count for roundnumber
      type: rounds.type,
    },
  });

  // Update the `roundid1` or `roundid2` field in `days` table for matching dates
  await prisma.days.updateMany({
    where: {
      date: {
        gte: new Date(rounds.startdate), // Greater than or equal to startdate
        lte: new Date(rounds.enddate), // Less than or equal to enddate
      },
      ...(rounds.type === 1
        ? { roundid1: null } // Only update rows where roundid1 is null for type 1
        : { roundid2: null }), // Only update rows where roundid2 is null for type 2
    },
    data: {
      ...(rounds.type === 1
        ? { roundid1: newRound.roundid } // Set new roundid for type 1
        : { roundid2: newRound.roundid }), // Set new roundid for type 2
    },
  });

  return newRound;
}

export async function getAllRound() {
  // Find the current show_list from web_settings where id = 1
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

  // Fetch rounds where Listid matches show_list
  return await prisma.rounds.findMany({
    where: {
      Listid: showList,
    },
  });
}

export async function SpecificDate(days: { roundid: number }) {
  const res = await prisma.days.findMany({
    where: {
      OR: [
        { roundid1: Number(days.roundid) },
        { roundid2: Number(days.roundid) },
      ],
    },
    orderBy: {
      date: "asc", // เรียงลำดับวันที่จากเก่าไปใหม่
    },
  });
  return res;
}

export async function deleteRound({ roundid }: { roundid: number }) {
  // ตรวจสอบว่า roundid นั้นมีอยู่หรือไม่
  const existingRound = await prisma.rounds.findUnique({
    where: {
      roundid: Number(roundid), // ตรวจสอบ roundid เป็น number
    },
  });

  if (!existingRound) {
    throw new Error(`รอบที่มี ID ${roundid} ไม่พบในระบบ.`);
  }

  // อัปเดต days โดยแยกการอัปเดต roundid1 และ roundid2 ออกมา
  await prisma.days.updateMany({
    where: { roundid1: Number(roundid) },
    data: { roundid1: null }, // เปลี่ยนเฉพาะ roundid1 เป็น null
  });

  await prisma.days.updateMany({
    where: { roundid2: Number(roundid) },
    data: { roundid2: null }, // เปลี่ยนเฉพาะ roundid2 เป็น null
  });

  // ลบ round จากตาราง rounds
  await prisma.rounds.delete({
    where: {
      roundid: Number(roundid),
    },
  });

  return { message: `ลบรอบที่มี ID ${roundid} สำเร็จแล้ว.` };
}

export async function TodayDate(days: { date: string }) {
  const res = await prisma.days.findUnique({
    where: {
      date: days.date,
    },
  });
  return res;
}

export async function RangeDate() {
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
  const res = await prisma.days.findMany({
    where: {
      OR: [{ roundid1: { in: roundList } }, { roundid2: { in: roundList } }],
      date: {
        gt: yesterday,
      },
    },
    orderBy: {
      date: "asc",
    },
  });
  return res;
}

export async function editSpecificDate(days: {
  dateid: number;
  status: string;
  maxuser: number;
  starttime: string;
  endtime: string;
}) {
  const update_date = await prisma.days.update({
    where: { dateid: days.dateid },
    data: {
      status: days.status,
      maxuser: days.maxuser,
      starttime: days.starttime,
      endtime: days.endtime,
    },
  });
  return update_date;
}

export async function webSettings() {
  return await prisma.web_settings.findUnique({
    where: {
      id: 1,
    },
  });
}

export async function editwebSettings(web_settings: {
  web_break_text: string;
  web_status: string;
}) {
  const update_date = await prisma.web_settings.update({
    where: { id: 1 },
    data: {
      web_break_text: web_settings.web_break_text,
      web_status: web_settings.web_status,
    },
  });
  return update_date;
}

export async function DASDSettings() {
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

  return await prisma.list_of_round.findUnique({
    where: {
      Listid: showList,
    },
  });
}

export async function editDASDSettings(list_of_round: { dasd_text: string }) {
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

  const update_date = await prisma.list_of_round.update({
    where: { Listid: showList },
    data: {
      Document_Amendment_Submission_Date: list_of_round.dasd_text,
    },
  });
  return update_date;
}
