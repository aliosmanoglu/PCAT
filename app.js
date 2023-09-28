// import conn from "./db.js";
// import express from "express";
// import path from "path";
// import ejs from "ejs";
// import dotenv from "dotenv";
// import mongoose from "mongoose";

const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
const ejs = require("ejs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const override = require("method-override");
const fs = require("fs");
const Photo = require("./models/Photo.js");
const photoController = require('./controllers/photoController.js');
const pageController = require('./controllers/pageController.js');

const app = express();

//CONNECT DB

dotenv.config();

mongoose
  .connect(process.env.DB_URL, {
    dbName: "pcat-db",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((e) => {
    console.log("CONNECTED");
  })
  .catch((err) => {
    console.log(`BAGLANTI HATASI ${err}`);
  });

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  override("_method", {
    methods: ["POST", "GET"],
  }),
);

const port = process.env.PORT || 3000;

// app.use("/", pageRoute);
// app.use("/photo", photoRoute);

//ROUTES
try {
  app.get("/", pageController.getIndexPage);
  app.get("/about", pageController.getAboutPage);
  app.get("/add", pageController.getAddPage);
  app.get("/photo/:id", pageController.getPhotoPage);
  app.get("/photo/edit/:id",pageController.getEditPage);
} catch (error) {
  console.log(error);
}

app.get("*", (req, res) => {
  // res.sendFile(path.resolve(__dirname,'temp/index.html'))
  res.send("404 NOT FOUND");
});
app.post("/photos", photoController.uploadPhoto);
app.put("/photo/:id", photoController.updatePhoto);
app.delete("/photo/:id", photoController.deletePhoto);

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
