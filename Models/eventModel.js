import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  uid: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  schedule: {
    type: Date,
  },
  description: {
    type: String,
  },
  files: {
    data: Buffer,
    contentType: String,
  },
  moderator: {
    type: String,
    // type: mongoose.ObjectId,
    // ref: "users",
    required: true,
  },
  category: {
    type: String,
  },
  sub_category: {
    type: String,
  },
  rigor_rank: {
    type: Number,
  },
  attendees: {
    type: [Number],
  },
});

const eventModel = mongoose.model(eventSchema, "event");

export default eventModel;
