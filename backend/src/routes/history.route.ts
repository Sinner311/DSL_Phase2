import express from 'express';

import {getSpecifichistory} from '../controllers/history.controller';

const router = express.Router();

router.get("/getSpecifichistory",getSpecifichistory)

module.exports = router;

