
const couponController=require("../controller/couponController")
var express = require("express")
var router = express.Router()
router.get("/couponList", couponController.addCoupon)
router.post("/addingCoupon", couponController.addingCoupon)
router.get("/editCoupon", couponController.editCoupon)
router.post("/editingCoupon", couponController.editingCoupon)
router.get("/deleteCoupon", couponController.deleteCoupon)
router.post("/applyingCoupon", couponController.applyingCoupon)
router.get("/showCoupon", couponController.showCoupon)
module.exports=router
