const profileControler=require("../controller/profileControler")
var express = require("express")
var router = express.Router()
router.get("/userProfile", profileControler.userProfileLoad)
router.get("/editUserprofile", profileControler.editUserprofile)
router.post("/editingUserDetails", profileControler.editUserDetails)
router.get("/addressManagement", profileControler.addressManagement)
router.get("/editAddress", profileControler.editAddress)
router.post("/editingAddress", profileControler.editingAddress)
router.post("/changePassword", profileControler.changeingPassword)
router.post("/addAddress", profileControler.addingAddress)
router.get("/viewOrderDetails", profileControler.showOrderDetails)
module.exports=router
