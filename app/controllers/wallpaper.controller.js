const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const Wallpaper = db.Wallpaper;
const { pathStatic } = require("../config/index");
const { request } = require("express");
const Comment = db.Comment;


// Retrieve all contacts of a user from the database
exports.findCollect = async(req, res, next) => {
    let condition = {}
    const name = req.params.name;
    if (name) {
        condition._collect = name
    }
    console.log('name', condition)
    const [error, documents] = await handle(
        Wallpaper.find(condition)
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while retrieving contacts"
            )
        );
    }

    return res.send(documents);
};

exports.findAll = async(req, res, next) => {
    let condition = {}
    const name = req.query.name;
    if (name) {
        condition.name = { $regex: new RegExp(name), $options: "i" };
    }

    const [error, documents] = await handle(
        Wallpaper.find(condition)
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while retrieving contacts"
            )
        );
    }

    return res.send(documents);
};

// Find a single contact with an id
exports.findOne = async(req, res, next) => {
    const condition = {
        _id: req.params.id,
    };
    console.log('id', req.params.id)
    const [error, document] = await handle(
        Wallpaper.findOne(condition).populate({
            path: 'comments.idComment',
            populate: {
                path: 'OwnerId'
            }
        })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
    const [err, count] = await handle(Wallpaper.count().exec())
    if (err) {
        return next(new BadRequestError(404, "Loi lay so luong wallpapers"));
    }
    let random = Math.floor(Math.random() * Number(count))
    const [e, recomments] = await handle(Wallpaper.find({ _id: { $ne: req.params.id } }).skip(random).limit(3))
    if (e) {
        return next(new BadRequestError(404, "Loi lay recomment"));
    }
    const data = {
        recomments,
        document
    }
    if (!document) {
        return next(new BadRequestError(404, "Wallpaper not found"));

    }

    return res.send(data);
};

exports.createComment = async(req, res, next) => {
    const condition = {
        _id: req.params.id,
    }

    const comment = new Comment({
        noidung: req.body.noidung,
        OwnerId: req.userId
    })
    const [err, d] = await handle(comment.save())
    if (err) {
        return next(new BadRequestError("Loi tao moi comment"))
    }
    const [error, document] = await handle(Wallpaper.findOneAndUpdate(condition, {
        $push: {
            comments: {
                idComment: comment.id
            }
        }
    }))
    if (error) {
        return next(new BadRequestError("Loi them comment"))
    }
    res.send(document)
}
exports.download = (req, res, next) => {
    // const path = 'http://localhost:6996/images'
    res.download("public/images/" + req.params.name)
}