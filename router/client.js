const router = require("express").Router()
const userController = require("../controller/user")



router.post("/api/user/create" ,  userController.register)
router.post("/api/user/login" , userController.login)
router.post("/api/user/resetpassword" , userController.ResetPassword)

router.get("/get/all/data" , userController.getAllDatasUsers)
router.get("/search/User" , userController.searchUser)
router.get("/user/logOut" , userController.logOut)


router.put("/user/:uuid" , userController.recoverPassword)
router.put("/update/:uuid" , userController.updateUser)


router.delete("/user/delete/:uuid" , userController.deleteUser)






module.exports = router