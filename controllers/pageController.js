const Photo = require('../models/Photo');

exports.getIndexPage = async (req, res) => {
  // res.sendFile(path.resolve(__dirname,'temp/index.html'))

  const page = req.query.page || 1;
  const perOnePage = 1;
  const totalPhotos = await Photo.find({}).count();

  const photos = await Photo.find({})
  .skip((page - 1) * perOnePage)
  .limit(perOnePage);


  res.render("index", {
    photos,
    current : page,
    pages : Math.ceil(totalPhotos / perOnePage)
  });
};

exports.getAboutPage = (req, res) => {
  // res.sendFile(path.resolve(__dirname,'temp/index.html'))
  res.render("about");
};
exports.getAddPage = (req, res) => {
  // res.sendFile(path.resolve(__dirname,'temp/index.html'))
  res.render("add");
};

exports.getPhotoPage = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render("photo", {
    photo,
  });
};

exports.getEditPage = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render("edit", {
    photo,
  });
};
