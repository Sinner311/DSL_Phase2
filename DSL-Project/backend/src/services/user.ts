import prisma from "../prisma/client";
import { users_role, users } from "@prisma/client";

export async function getUser() {
  return await prisma.users.findMany();
}

export async function addUser(users: {
  studentid: string;
  email: string;
  name: string;
  role: users_role;
  channel: number | null;
}) {
  const res = await prisma.users.create({ data: users });
  return res;
}


export async function getSpecificuser(users: {
  email: string;
  studentid?: string;
}) {
  // console.log(users.studentid);
  const res = await prisma.users.findUnique({
    where: {
      email: users.email,
      studentid: users.studentid,
    },
  });
  return res;
}

export async function editSpecificuser(users: {
  email: string;
  data: {
    email?: string;
    name?: string;
    studentid?: string;
    role?: users_role;
    channel?: number;
    refresh?: string;
  };
}) {
  const update_user = await prisma.users.update({
    where: {
      email: users.email,
    },
    data: users.data,
  });
  return update_user;
}





export async function getStaff() {
  return await prisma.users.findMany({
    where: {
      role: {
        in: ["ADMIN"],
      },
    },
  });
}