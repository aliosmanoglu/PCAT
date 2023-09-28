const mongoose = require("mongoose");


const PhotoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trima: true,
  },
  description: {
    type: String,
    required: true,
    trima: true,
  },
  image: {
    type: String,
  },
  upladedAt: {
    type: Date,
    default: Date.now,
  },
});

const Photo = mongoose.model("Photo", PhotoSchema);

module.exports = Photo;

// Photo.create({
//   title: "PHOTO 1",
//   description: "DESCRIPTION",
// });
