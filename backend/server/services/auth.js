const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { throughError, forbidden } = require("../shared/utls/httpResponseHandler");
const Story = require("../models/story");
module.exports = {
    checkAuth: async (req, res, next) => {
        try {
            let bearer = req.headers.authorization;
            let token = bearer?.split(" ")[1];
            if (!token) {
                return forbidden(res, "Please login again", {});
            }
            var decoded = jwt.verify(token, process.env.SECRET);
            req.user = decoded.data;
            next();
        } catch (err) {
            if (err.message == "jwt expired") {
                return forbidden(res, "Your jwt is expired", err.stack);
            }
            return forbidden(res, "Please login again", err.stack);
        }
    },
    checkAdminOrAuthor: async(req, res, next) => {
        try{
            const {id} = req.params;
            const isAuthor = await Story.countDocuments({id: id, authorId: req.user.id});
            if(!isAuthor && req.user.roleId !== "1"){
                return forbidden(res, "You have no permission to perform that operation", {});
            }
            next();
        }catch(err){
            return forbidden(res, "Please login again", err.stack);
        }
    },
    checkAdmin: async (req, res, next) => {
        try{
            if(req.user.roleId !== "1"){
                return forbidden(res, "You have no permission to perform that operation", {});
            }
            next();
        }catch(err){
            return forbidden(res, err.message, err.stack);
        }
    },
    isManager: async () => {
        return true;
    },
    isCreator: async () => {
        return true;
    },
    hashPassword: (password) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    },
    passwordCompare: (password, hash) => {
        return bcrypt.compareSync(password, hash);;
    },

    setToken: (data) => {
        return jwt.sign({
            data: data
        }, process.env.SECRET, { expiresIn: '24h' });
    }
}