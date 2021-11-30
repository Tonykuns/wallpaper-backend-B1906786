module.exports = mongoose => {
    const schema = mongoose.Schema({
        name: {
            type: String,
            required: [true, "Contact name is required"],
        },
        _collect: String,
        luotDownload: Number,
        view: Number,
        likeBy: [{
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            }
        }, ],
        comments: [{
            idComment: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "comment"
            }
        }, ]
    }, { timestamps: true });

    // Replace _id with id and remove __V
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("wallpaper", schema);
};