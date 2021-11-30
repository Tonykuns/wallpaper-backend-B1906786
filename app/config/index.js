const config = {
    app: {
        port: process.env.PORT || 6996
    },
    db: {
        url: "mongodb://localhost:27017/wallpaper"
    },
    jwt: {
        secret: "luong son bac"
    },
    pathStatic: process.cwd().toString(),
};

module.exports = config;