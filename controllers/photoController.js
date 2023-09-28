const Photo = require('../models/Photo')
const fs = require('fs');

exports.uploadPhoto = async (req, res) => {
  // res.sendFile(path.resolve(__dirname,'temp/index.html '))
  // await Photo.create(req.body);
  // console.log(req.files.photo);
  // res.redirect("/");

  const uploadDir = "./public/uploads";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadImage = req.files.photo;
  let uploadPath = __dirname + "/../public/uploads/" + uploadImage.name;

  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: "/uploads/" + uploadImage.name,
    });
    res.redirect("/");
  });
};

exports.updatePhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    photo.name = req.body.name;
    photo.description = req.body.description;
    photo.save();
  
    res.redirect(`/photo/${req.params.id}`);
  };

exports.deletePhoto = async (req, res) => {
  try {
    console.log(req.params.id);
    const photo = await Photo.findOne({ _id: req.params.id });
    let path = __dirname + "/../public" + photo.image;
    fs.unlinkSync(path);

    await Photo.findByIdAndRemove(req.params.id);
  } catch (error) {
    console.log("DOSYA SİLME HATASI : " + error);
  }
  res.redirect("/");
};
