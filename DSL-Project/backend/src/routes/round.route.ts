import express from "express";

import {
  getAllListOfRound,
  createListOfRound,
  changeWebShowList,
  getDate,
  createRound,
  getRound,
  getSpecificDate,
  DeleteRound,
  getTodayDate,
  getRangeDate,
  geteditSpecificDate,
  getwebSettings,
  geteditwebSettings,
  getDASDSettings,
  geteditDASDSettings,
} from "../controllers/round.controller";

const router = express.Router();

router.get("/getListOfRound", getAllListOfRound);
router.post("/createListOfRound", createListOfRound);
router.put("/changeWebShowList", changeWebShowList);
router.get("/getDate", getDate);
router.post("/createRound", createRound);
router.get("/getRound", getRound);
router.get("/getSpecificDate", getSpecificDate);
router.delete("/DeleteRound", DeleteRound);
router.get("/getTodayDate", getTodayDate);
router.get("/getRangeDate", getRangeDate);
router.put("/geteditSpecificDate", geteditSpecificDate);
router.get("/getwebSettings", getwebSettings);
router.put("/geteditwebSettings", geteditwebSettings);
router.get("/getDASDSettings", getDASDSettings);
router.put("/geteditDASDSettings", geteditDASDSettings);

module.exports = router;
