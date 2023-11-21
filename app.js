var createError = require("http-errors")
var express = require("express")
const session = require("express-session")
var path = require("path")
require("dotenv").config()
require("./passport-setup")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection
db.on("error", () => console.log("Error while connecting"))
db.once("open", () => console.log("Connected successfully"))
var adminRouter = require("./routes/adminRoute")
var usersRouter = require("./routes/userRoute")
var cartRouter = require("./routes/cartRoute")
var categoeyRouter = require("./routes/categoryRoute")
var productRouter = require("./routes/productRoute")
var profileRouter = require("./routes/profileRoute")
var orderRouter = require("./routes/orderRoute")
var wishListRouter = require("./routes/wishListRoute")
var couponRouter=require("./routes/couponRoute")
var app = express()
const userSessionConfig = {
    name: "userSession",
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 360000000 },
}
app.use("/", session(userSessionConfig))
// view engine setup
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use((req, res, next) => {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate")
    next()
})
app.use("/", usersRouter)
app.use("/admin", adminRouter)
app.use("/cart", cartRouter)
app.use("/admin/category", categoeyRouter)
app.use("/admin/product", productRouter)
app.use("/product", productRouter)
app.use("/profile", profileRouter)
app.use("/admin/order", orderRouter)
app.use("/order", orderRouter)
app.use("/admin/coupon",couponRouter)
app.use("/wishList", wishListRouter)
app.get("*", (req, res) => {
    res.render("PageNotFound")
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get("env") === "development" ? err : {}
    // render the error page
    res.status(err.status || 500)
    res.render("error")
})
module.exports = app
