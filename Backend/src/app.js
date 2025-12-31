import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
const app = express();

const allowedOrigins = [
  "http://localhost:5173", // for local dev
  "https://earnest-toffee-6a5983.netlify.app/", // your Netlify URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Postman or server requests
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Always write routes after the config
app.use("/api/v1/users", userRouter);

export default app;
