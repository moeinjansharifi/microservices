import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddle.js";
import userRoute from "./route/userRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", userRoute);

app.use(errorHandler);
app.use(notFound);
const PORT = process.env.AU_PORT || 5001;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
