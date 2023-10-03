const router = require("express").Router()
const adminController = require("../controller/adminController")
const multer = require('multer');




const upload = multer({ dest: 'uploads/' });
router.post("/CreateUSer" , upload.single("image") , adminController.CreateUSer)



module.exports = router