exports.auth = async (req, res, next) => {
    if (req.session.auth) {
        next()
    }
    else {
        return res.redirect("/404")
    }
}
exports.roles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.session.role)) {
            return res.redirect("/404")
        }
        next();
    };
}
