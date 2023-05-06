import express from "express";
import eventController from "../Controllers/eventController.js";

const router = express.Router();

// Creating An Event
router.post("/events", eventController.createEvent);

// Getting Event by its Unique Id
router.get('/events?:id', eventController.getEvent)

// Getting a specific Image
router.get('/image?:_id', eventController.getImage);

export default router;
