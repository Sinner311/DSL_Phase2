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