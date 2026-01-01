import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
const app = express();

app.use(
  cors({
    origin: [
      // "http://localhost:5173",
      "https://earnest-toffee-6a5983.netlify.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Always write routes after the config
app.use("/api/v1/users", userRouter);

export default app;
