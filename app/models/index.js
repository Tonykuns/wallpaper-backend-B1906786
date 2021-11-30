const mongoose = require("mongoose");
const createCommentModel = require("./comment.model");
const createWallpaperModel = require("./wallpaper.model");
const createUserModel = require("./user.model");

const db = {};
db.mongoose = mongoose;
db.Comment = createCommentModel(mongoose);
db.User = createUserModel(mongoose);
db.Wallpaper = createWallpaperModel(mongoose);

module.exports = db;