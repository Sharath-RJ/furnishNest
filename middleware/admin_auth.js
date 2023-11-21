const is_Admin = (req, res, next) => {
    if (req.session && req.session.Admin) next()
    else res.render("backEnd/forbidden")
}
module.exports = is_Admin
