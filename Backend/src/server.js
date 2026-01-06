import dotenv from "dotenv";
dotenv.config({
  path: "./env",
});
import app from "./app.js";
import connect_DB from "./config/db.js";

connect_DB();

app.listen(process.env.PORT || 5000, () => {
  console.log("Sever started SuccessFully at  Port", process.env.PORT);
});
