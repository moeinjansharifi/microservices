import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import multer from "multer";

import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddle.js";
import placeRoute from "./route/placeRoutes.js";

dotenv.config();

connectDB();

const app = express();
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const photosMiddleware = multer({ dest: "uploads/" });
app.post(
  "/places/upload",
  photosMiddleware.array("photos", 100),
  async (req, res) => {
    const uploadedFiles = [];

    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname, mimetype } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);

      uploadedFiles.push(newPath.replace("uploads/", ""));
    }
    res.json(uploadedFiles);
  }
);

app.use("/places", placeRoute);

app.use(errorHandler);
app.use(notFound);
const PORT = process.env.PL_PORT || 5002;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
