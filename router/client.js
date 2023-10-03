const router = require("express").Router()
const userController = require("../controller/user")



router.post("/api/user/create" ,  userController.register)
router.post("/api/user/login" , userController.login)
router.post("/api/user/resetpassword" , userController.ResetPassword)

router.get("/get/all/data" , userController.getAllDatasUsers)

router.put("/user/:uuid" , userController.recoverPassword)





module.exports = router