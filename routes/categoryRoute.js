const categoryControler=require("../controller/categoeyControler")
const categoryUpload = require("../middleware/category_multer")
var express = require("express")
var router = express.Router()

router.get("/editCategory", categoryControler.editCategory)
router.post(
    "/updateCategory",
    categoryUpload.single("categoryImage"),
    categoryControler.updateCategory
)
router.get("/unlistCategory", categoryControler.deleteCategory)
router.get("/listCategory", categoryControler.listCategory)
router.get("/categoryAdd", categoryControler.loadCategoryPage)
router.post(
    "/createCategory",
    categoryUpload.single("categoryImage"),
    categoryControler.createCategory
)
module.exports=router