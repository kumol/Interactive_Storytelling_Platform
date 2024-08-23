module.exports.success = (res, msg, body, optional) => {
    let responseObj = {
        statusCode: 200,
        success: true
    };
    optional ? optional.total ? responseObj.total = optional.total : null : null;
    optional ? optional.limit ? responseObj.limit = optional.limit : null : null;
    optional ? optional.page ? responseObj.page = optional.page : null : null;
    responseObj.message = msg ? msg : "";
    responseObj.msg = msg ? msg : "";
    responseObj.body = body ? body : {};
    return res.status(200).json(responseObj);
};

module.exports.created = (res, msg, body) => {
    return res.status(200).json({
        statusCode: 201,
        success: true,
        message: msg || "Successfully Created",
        msg: msg || "Successfully Created",
        body: body
    });
};

module.exports.notFound = (res, msg, body, optional) => {
    let responseObj = {
        statusCode: 204,
        success: false
    };
    optional ? optional.total ? responseObj.total = optional.total : null : null;
    optional ? optional.limit ? responseObj.limit = optional.limit : null : null;
    optional ? optional.page ? responseObj.page = optional.page : null : null;
    responseObj.message = msg ? msg : "";
    responseObj.msg = msg ? msg : "";
    responseObj.body = body ? body : {};
    return res.status(200).json(responseObj);
};

module.exports.notModified = (res, msg, body) => {
    return res.status(200).json({
        statusCode: 304,
        success: false,
        message: msg ? msg : "",
        msg: msg ? msg : "",
        body: body ? body : {}
    });
};

module.exports.throughError = (res, body) => {
    return res.status(500).json({
        statusCode: 500,
        success: false,
        message: body ? body.message : "",
        msg: body ? body.message : "",
        body: body ? body.stack : {}
    });
};

module.exports.forbidden = (res, msg, body)=>{
    return res.status(403).json({
        statusCode: 403,
        success: false,
        message: msg || "Unauthorized",
        body: body
    })
}
module.exports.badRequest = (res, msg, body) => {
    return res.status(422).json({
        statusCode: 422,
        success: false,
        message: msg || "Unprocessable Entity",
        msg: msg || "Unprocessable Entity",
        body: body
    });
};

module.exports.conflict = (res, msg, body) => {
    return res.status(409).json({
        statusCode: 409,
        success: false,
        message: msg || "Conflict",
        body: body
    });
};
