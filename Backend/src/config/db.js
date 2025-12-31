import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connect_DB = async () => {
  try {
    const db_instance = await mongoose.connect(
      `${process.env.MONGO_DB_STR}/${DB_NAME}`
    );
    console.log(
      `Database connected successfully ${db_instance.connection.name} `
    );
  } catch (error) {
    console.log(`Failed to connect with database`);
    process.exit(1);
  }
};

export default connect_DB;
