const express = require("express");
const UserModel = require("./schema");
const { adminOnly, basic } = require("../authTools");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "m8-d2",
    format: async (req, file) => "png" || "jpg",
    public_id: async (req, file) => req.user.username + "_profile",
  },
});

const parser = multer({ storage: storage });

const usersRouter = express.Router();

usersRouter.get("/", basic, adminOnly, async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = new UserModel({ image: "https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg", ...req.body });
    const { _id } = await newUser.save();

    res.status(201).send(_id);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/me", basic, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(err);
  }
});

usersRouter.put("/me", basic, async (req, res, next) => {
  try {
    const updates = Object.keys(req.body);
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});
usersRouter.post("/me/picture", basic, parser.single("image"), async (req, res, next) => {
  try {
    req.user.image = req.file.path;
    await req.user.save();
    res.status(200).send(req.user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.delete("/me", basic, async (req, res, next) => {
  try {
    await req.user.deleteOne();
    res.status(204).send("Deleted");
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
