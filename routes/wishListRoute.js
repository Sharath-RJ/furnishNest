const wishlistController=require("../controller/wishlistController")
var express = require("express")
var router = express.Router()
router.get("/addToWishList", wishlistController.addToWishList)
router.get("/removeWishList", wishlistController.removeWishList)
router.get("/viewWishList", wishlistController.viewWishList)
module.exports=router
