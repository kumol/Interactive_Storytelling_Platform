const moment = require("moment/moment");
const User = require("../models/user");
const authService = require("../services/auth");
const { forbidden } = require("../shared/utls/httpResponseHandler");
const { throughError, created, badRequest, success, notFound, notModified } = require("../shared/utls/httpResponseHandler");
module.exports = {
    addUser: async (req, res) => {
        try {
            let { password, email, name, roleId } = req.body;
            if (!email || !password || !name) {
                return badRequest(res, "Name, email and password are required");
            }
            let emailExpression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            email = email.trim();
            name = name.trim();
            password = authService.hashPassword(password);
            if(!email.match(emailExpression)){
                return badRequest(res, "Invalid formation of email address");
            };
            let user = new User({
                name,
                email,
                password,
                createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
            });
            user.id = user._id;
            if(roleId) user.roleId = roleId;
            user = await user.save();
            return created(res, "successfully created", user);
        } catch (err) {
            return throughError(res, err);
        }
    },
    getUserList: async (req, res) => {
        try {
            let page = +req.query.page || 1,
                limit = +req.query.limit || 10,
                total = await User.countDocuments({});
            let query = {};
            let user = await User.find(query).select("-__v _id").sort({ _id: -1 }).skip((page - 1) * limit).limit(limit).lean();
            return success(res, "", user, { total: total, limit, page });
        } catch (err) {
            return throughError(res, err);
        }
    },
    getUser: async (req, res) => {
        try {
            let id = req.params.id;
            let user = await User.findOne({ id: id }).select("-__v _id").lean();
            return success(res, "", user);
        } catch (err) {
            return throughError(res, err);
        }
    },

    deleteUser: async (req, res) => {
        try {
            let { id } = req.params;
            let deletedUser = await User.deleteOne({ id: id });
            return deletedUser.deletedCount ? success(res, "successfully deleted", {}) : notFound(res, "no user found", {});
        } catch (err) {
            return throughError(res, err);
        }
    },

    updateUser: async (req, res) => {
        try {
            let { id } = req.params;
            let { name, password, email } = req.body;
            let emailExpression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            let updateObj = {};
            email ? email = email.trim() : null;
            if(email && !email.match(emailExpression)){
                return badRequest(res, "Invalid formation of email address");
            };
            email && email.match(emailExpression) ? updateObj.email = email : null;
            name ? updateObj.name = name.trim() : null;
            password ? updateObj.password = authService.hashPassword(password) : null;
            let updated = await User.updateOne({ id: id }, { $set: updateObj });
            let user = await User.findOne({ id: id }).select("-__v _id").lean();
            return updated.modifiedCount ? success(res, "", user) : notModified(res, "Not Modified", user);
        } catch (err) {
            return throughError(res, err);
        }
    },

    login: async (req, res) => {
        try {
            let { email, password } = req.body;
            if (!email || !password) {
                return badRequest(res, "Passward and email are requierd")
            }
            let user = await User.findOne({ email: email }).select("-_v -_id").lean();
            if (!user) {
                return forbidden(res, "Wrong email ");
            }
            if (!authService.passwordCompare(password, user.password)) {
                return forbidden(res, "Wrong password")
            }
            const token = authService.setToken({ name: user.name, email: user.email, id: user.id, roleId: user.roleId});
            return success(res, "Successfully loged in", { token: token });

        } catch (err) {
            return throughError(res, err);
        }
    }
}