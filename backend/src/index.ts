import express from "express";
import "dotenv/config";
import { jwtValidate } from "./middleware/jwt.middleware";
import cookie from "cookie-parser";
import session from "express-session";
// import { resetQueueOrder } from "./services/queueRepository";

const path = require("path");
const cors = require("cors");
const passport = require("passport");

const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const roundRouter = require("./routes/round.route");
// const queueRouter = require("./routes/queue.route");
// const historyRouter = require("./routes/history.route");

const port = parseInt(process.env.PORT!) || 7777; // Port for the server
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookie());

process.env.TZ = "Asia/Bangkok";
console.log(new Date().toLocaleString());

ringout();

// jwtValidate
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/round", roundRouter);
// app.use("/api/queue", queueRouter);
// app.use("/api/history", historyRouter);

app.listen(port, function () {
  console.log("Server is ready at ", port);
});

async function ringout() {
  setInterval(async () => {
    const now = new Date();
    console.log(`${now.getHours()} : ${now.getMinutes()} : ${now.getSeconds()}`);
    if (
      now.getHours() === 23 &&
      now.getMinutes() >= 22 &&
      now.getSeconds() >= 0
    ) {
      console.log("Resetting queue order...");
      // await resetQueueOrder();
    }
  }, 5000); // ตรวจสอบทุกๆ 1 วินาที (1000 มิลลิวินาที)
}
