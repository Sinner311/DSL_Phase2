import express from "express";
import "dotenv/config";
import { jwtValidate } from "./middleware/jwt.middleware";
import cookie from "cookie-parser";
import session from "express-session";
// import { resetQueueOrder } from "./services/queueRepository";
import { autoCreateDay } from "./services/round";
import { getDashboardData } from "./services/dashboard";
import { getHistoryQueueData } from "./services/review";
import dashboardRouter from "./routes/dashboard.route"; // 👈 Import dashboard route
import reviewRouter from "./routes/review.route"; // 👈 Import dashboard route

const path = require("path");
const cors = require("cors");
const passport = require("passport");

const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const roundRouter = require("./routes/round.route");
const bookingRouter = require("./routes/booking.route");
const queueRouter = require("./routes/queue.route");
const historyRouter = require("./routes/history.route");

const port = parseInt(process.env.PORT!) || 7777; // Port for the server
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookie());

process.env.TZ = "Asia/Bangkok";
console.log(new Date().toLocaleString());

ringout();
getDashboardData();
// jwtValidate
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/round", roundRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/queue", queueRouter);
app.use("/api/history", historyRouter);
app.use("/api/review", reviewRouter);
app.use("/api/dashboard", dashboardRouter); // 👈 Register the dashboard route

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
      await autoCreateDay();
    }
    // await autoCreateDay();
  }, 5000); // ตรวจสอบทุกๆ 1 วินาที (1000 มิลลิวินาที)
}
