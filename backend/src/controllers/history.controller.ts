const asynchandler = require("express-async-handler");
import moment from "moment-timezone";

import { $Enums } from "@prisma/client";
import {
  Specifichistory,
} from "../services/history";

export const getSpecifichistory = asynchandler(async (req: any, res: any) => {
  const { studentid } = req.query;
  const getusergetSpecifichistory = await  Specifichistory({
    studentid: studentid,
  });
  res.status(200).send(getusergetSpecifichistory);
});