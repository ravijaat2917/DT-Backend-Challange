import express from "express";
import eventController from "../Controllers/eventController.js";

const router = express.Router();

// Creating An Event
router.post("/events", eventController.createEvent);

export default router;
