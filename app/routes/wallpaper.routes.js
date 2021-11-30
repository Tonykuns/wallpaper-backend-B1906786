const express = require("express");
const wallpapers = require("../controllers/wallpaper.controller");
const middlewares = require("../middlewares");

module.exports = app => {
    const router = express.Router();

    router.get("/", wallpapers.findAll);
    router.get("/collect/:name", wallpapers.findCollect);
    router.get("/download/:name", wallpapers.download)
    router.post("/comment/:id", [middlewares.verifyToken], wallpapers.createComment)
    router.get("/:id", wallpapers.findOne);

    // router.post("/like", wallpapers.setLike);
    // router.post("/addview/:id", wallpapers.addView);
    // router.post("/adddown/:id", wallpapers.addDownLoad);

    app.use("/api/wallpapers", router);
};