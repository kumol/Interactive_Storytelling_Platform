const route = require("express").Router();
const userRoute = require("./routes/user");
const storyRoute = require("./routes/story");

route.use("/user", userRoute);
route.use("/story", storyRoute);
module.exports = route;