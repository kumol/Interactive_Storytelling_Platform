const moment = require("moment/moment");
const Story = require("../models/story");
const authService = require("../services/auth");
const { throughError, created, badRequest, success, notFound, notModified, forbidden } = require("../shared/utls/httpResponseHandler");
module.exports = {
    getAllStory: async (req, res) => {
        try {
            let page = +req.query.page || 1,
                limit = +req.query.limit || 10,
                author = req.query.authorId;
            let query = {};
            if (author) query.authorId = author;
            let total = await Story.countDocuments(query)
            let story = await Story.find(query).select("-__v -paths _id").sort({ _id: -1 }).skip((page - 1) * limit).limit(limit).lean();
            return success(res, "", story, { total: total, limit, page });
        } catch (err) {
            return throughError(res, err);
        }
    },
    createNewStory: async (req, res) => {
        try{
            const { title, body, paths } = req.body;
            const newStory = new Story({
                title,
                body,
                paths,
                authorId: req.user.id,
                authorName: req.user.name,
                createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
            });
            newStory.id = newStory._id;
            await newStory.save();
            return created(res, "successfully created", newStory);
        } catch (err){
            return throughError(res, err);
        }
    },
    getSingleStory: async (req, res) => {
        try{
            let {id} = req.params;
            let story = await Story.findOne({id: id}).select("-__v -_id").lean();
            return success(res, "", story);
        } catch (err){
            return throughError(res, err);
        }
    },
    updateStory: async (req, res) => {
        try{
            const {id} = req.params;
            const { title, body, paths } = req.body;
            let updatedObj = {};
            if(title) updatedObj.title = title;
            if(body) updatedObj.body = body;
            if(paths) updatedObj.paths = paths;
            if(engagedTime) updatedObj.engagedTime = engagedTime;

            let updated = await Story.updateOne({ id: id }, { $set: updateObj });
            let story = await Story.findOne({ id: id }).select("-__v _id").lean();
            return updated.modifiedCount ? success(res, "", story) : notModified(res, "Not Modified", story);
        } catch (err){
            return throughError(res, err);
        }
    },
    deleteStory: async (req, res) => {
        try{
            let { id } = req.params;
            let deletedStory = await Story.deleteOne({ id: id });
            return deletedStory.deletedCount ? success(res, "successfully deleted", {}) : notFound(res, "no user found", {});
        } catch (err){
            return throughError(res, err);
        }
    }
}