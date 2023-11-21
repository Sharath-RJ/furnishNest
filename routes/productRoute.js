
var express = require("express")
var router = express.Router()
const productControler=require("../controller/productControler")
const upload = require("../middleware/multer")
router.get("/viewProductPagination", productControler.viewProductPagination)
router.get("/productImageDelete", productControler.productImageDelete)
router.get("/provideDiscount", productControler.provideDiscount)
router.get("/addProduct", productControler.loadAddProduct)
router.post(
    "/addProduct",
    upload.array("productImage"),
    productControler.insertProduct
)
router.get("/editProduct", productControler.editProduct)
router.post(
    "/editProduct",
    upload.array("productImage"),
    productControler.editingProduct
)
router.get("/viewProducts", productControler.viewProducts)
router.get("/delete", productControler.deleteProduct)
router.get("/productDetails", productControler.productDetails)
router.get("/AllProduct_Category", productControler.showAllProducts)
module.exports=router
