import express from 'express';

import {getAllListOfRound,createListOfRound,changeWebShowList,getDate,createRound} from '../controllers/round.controller';

const router = express.Router();

router.get("/getListOfRound",getAllListOfRound);
router.post("/createListOfRound",createListOfRound);
router.put("/changeWebShowList",changeWebShowList);
router.get("/getDate",getDate);
router.post("/createRound",createRound);


router.get("/testtime",(req,res)=>{
    const {date} = req.body;
    // console.log(new Date(date).toString);
    res.status(200).send({
        "dates": new Date(date).toString()
    });
})

module.exports = router;