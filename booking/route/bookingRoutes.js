import express from "express";
import BookingController from "../controller/bookingControllers.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/account")
  .post(protect, BookingController.createBooking)
  .get(protect, BookingController.getUserBooking);

export default router;
