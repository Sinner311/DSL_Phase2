import prisma from "../prisma/client";
import { history_booking, web_settings } from "@prisma/client";

export async function Specifichistory(history_booking: { studentid: string | number | null }) {
  if (!history_booking.studentid) {
    throw new Error("studentid is required");
  }

  const studentIdNumber = Number(history_booking.studentid);
  if (isNaN(studentIdNumber)) {
    throw new Error("Invalid studentid format");
  }

  const res = await prisma.history_booking.findFirst({
    where: {
      studentid: studentIdNumber,
    },
  });

  return res;
}
