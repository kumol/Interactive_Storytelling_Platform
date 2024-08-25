const route = require("express").Router();
const storyController = require("../../controller/story");
const {checkAuth, checkAdminOrAuthor, checkAdmin} = require("../../services/auth");
route.get("/", storyController.getAllStory);
route.post("/", checkAuth, storyController.createNewStory);
route.get("/:id", storyController.getSingleStory);
route.patch("/:id", checkAuth, checkAdminOrAuthor, storyController.updateStory);
route.put("/:id", storyController.storyReadingTime);
route.delete("/:id", checkAuth, checkAdminOrAuthor, storyController.deleteStory);

module.exports = route;