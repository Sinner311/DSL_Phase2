import prisma from "../prisma/client";
import { list_of_round , web_settings } from "@prisma/client";

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
    console.log(list_of_round.show_list)
    const update_user = await prisma.web_settings.update({
        where: {
            id: 1,  // ระบุ id ของ record ที่ต้องการอัปเดต
        },
        data: {
            show_list: parseInt(list_of_round.show_list),  // อัปเดตค่าของ show_list
        },
        
    });
    return update_user;
}


export async function autoCreateDay() {
  // Get today's date and set it to the start of the day
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of the day

  // Set the target end date (4 months from today)
  const endDate = new Date(today);
  endDate.setMonth(endDate.getMonth() + 4);

  // Loop through each day from today to the end date
  for (let currentDate = new Date(today); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
    // Skip weekends (Saturday: 6, Sunday: 0)
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      continue; // Skip Saturdays and Sundays
    }

    // Check if the date already exists in the database
    const existingDay = await prisma.days.findFirst({
      where: {
        date:new Date(currentDate.setHours(7, 0, 0)),
      },
    });
// console.log(existingDay,currentDate)
    // If the date does not exist, create it
    if (!existingDay) {
      await prisma.days.create({
        data: {
          date: currentDate,
          status: 'normal', // คุณสามารถกำหนดค่าอื่นๆ ได้ตามต้องการ
          maxuser: 350, // ตัวอย่าง: จำนวนผู้ใช้สูงสุด
          starttime: new Date(currentDate.setHours(15, 30, 0)), // ตัวอย่าง: เวลาเริ่มต้น 9:00 AM
          endtime: new Date(currentDate.setHours(23, 0, 0)), // ตัวอย่าง: เวลาสิ้นสุด 5:00 PM
        },
      });
    }
  }

  console.log('Days have been auto update!');
}


export async function getAllDate() {
  return await prisma.days.findMany();
}



export async function addRound(rounds: {
  startdate: string;
  enddate: string;
  type:number;
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
    throw new Error('Unable to find show_list from web_settings with id = 1.');
  }

  const Listid = webSettings.show_list;

  // Check if any day in the range startdate to enddate has rounded not null
  const conflictingDays = await prisma.days.findMany({
    where: {
      date: {
        gte: new Date(rounds.startdate), // Greater than or equal to startdate
        lte: new Date(rounds.enddate), // Less than or equal to enddate
      },
      roundid: {
        not: null, // Only check days where rounded is not null
      },
    },
  });

  if (conflictingDays.length > 0) {
    throw new Error(
      `Cannot add round. There are ${conflictingDays.length} days in the range with non-null rounded values.`
    );
  }

  // Count existing rounds with the same Listid
  const existingRoundsCount = await prisma.rounds.count({
    where: {
      Listid: Listid,
    },
  });

  // Create the round with the retrieved Listid and calculated roundnumber
  const newRound = await prisma.rounds.create({
    data: {
      Listid: Listid,
      startdate: new Date(rounds.startdate), // Convert string to Date object
      enddate: new Date(rounds.enddate), // Convert string to Date object
      status: 'normal',
      roundnumber: existingRoundsCount + 1, // Increment the count for roundnumber
      type:rounds.type,
    },
  });

  // Update the `rounded` field in `days` table for matching dates
  await prisma.days.updateMany({
    where: {
      date: {
        gte: new Date(rounds.startdate), // Greater than or equal to startdate
        lte: new Date(rounds.enddate), // Less than or equal to enddate
      },
      roundid: null, // Only update rows where rounded is null
    },
    data: {
      roundid: newRound.roundid, // Use the newly created roundid
    },
  });

  return newRound;
}

