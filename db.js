const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

console.log(process.env.DB_URL);


// mongoose
//   .connect(process.env.DB_URL, {
//     dbName: "pcat-db",
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then((e) => {
//     console.log("CONNECTED");
//   })
//   .catch((err) => {
//     console.log(`BAGLANTI HATASI ${err}`);
//   });

const PhotoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trima: true,
  },
  description: {
    type: String,
    required: true,
    trima: true,
  },
  upladedAt: {
    type: Date,
    default: Date.now,
  },
});

const Photo = mongoose.model("Photo", PhotoSchema);

// Photo.create({
//   title: "PHOTO 1",
//   description: "DESCRIPTION",
// });
