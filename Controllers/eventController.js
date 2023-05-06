import eventModel from "../Models/eventModel.js";
import fs from "fs";

export default class eventController {
  // To create a new Event
  static createEvent = async (req, res) => {
    try {
      const {
        name,
        tagline,
        schedule,
        description,
        moderator,
        category,
        sub_category,
        rigor_rank,
        attendees,
      } = req.fields;
      const { files } = req.files;

      // Validation

      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !category:
          return res.status(500).send({ error: "Category is Required" });
        case !sub_category:
          return res.status(500).send({ error: "Sub_category is Required" });
        case !rigor_rank:
          return res.status(500).send({ error: "Rigor_RAnk is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !tagline:
          return res.status(500).send({ error: "tagline is Required" });
        case !schedule:
          return res.status(500).send({ error: "Schedule is Required" });
        case !moderator:
          return res.status(500).send({ error: "Moderator is Required" });
        case files && files.size > 1000000:
          return res.status(500).send({
            error: "Files is Required and should be less then 1mb",
          });
      }
      const event = new eventModel({ ...req.fields });

      if (
        files.type === "image/jpeg" ||
        files.type === "image/jpg" ||
        files.type === "image/png"
      ) {
        // console.log("Right File");
        // console.log(files.type);
        event.files.data = fs.readFileSync(files.path);
        event.files.contentType = files.type;
      } else {
        return res.send({
          success: false,
          message: "Upload A jpeg/jpg/png File Only",
        });
      }

      await event.save();

      const savedEvent = await eventModel
        .find({ _id: event._id })
        .select("-files");

      if (savedEvent) {
        const created = savedEvent[0]._id;
        // console.log(created[0]._id);
        return res
          .status(200)
          .send({ success: true, message: "Created Successfully", created });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ success: false, message: "Error in creating new event" });
    }
  };

  // get specific photo by  object id
  static getImage = async (req, res) => {
    try {
      const { _id } = req.query;
      const image = await eventModel.findById(_id).select("files");

      res
        .status(200)
        .send({ success: true, message: "Images Getting Successfully", image });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ success: false, message: "Error in getting Photo" });
    }
  };
  // get a event by its unique Id
  static getEvent = async (req, res) => {
    try {
      const { id } = req.query;

      const event = await eventModel.findById(id).select("-files");
      res.send(event);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ success: false, message: "Error in getting Event" });
    }
  };
}
