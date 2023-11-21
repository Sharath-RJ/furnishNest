const orderControler=require("../controller/orderControlers")
var express = require("express")
var router = express.Router()
router.post("/placingOrder", orderControler.placingOrder)
router.get("/myOrdersView", orderControler.viewMyOrders)
router.post("/cancelOrder", orderControler.cancelOrder)
router.get("/addAddressLoad", orderControler.addingAddressLoad)
router.post("/addingAddress", orderControler.addingAddress)
router.post("/verify-payment", orderControler.loadVerify)
router.get("/returnOrder", orderControler.returnOrder)
router.get("/orderList", orderControler.orderList)
router.get("/orderDetails", orderControler.orderDetails)
router.get("/updateStatus", orderControler.updateStatus)
router.get("/returns", orderControler.returnOrderListing)
router.get("/returnDetails", orderControler.returnDetails)
router.get("/cancelDetails", orderControler.cancelDetails)
module.exports=router
