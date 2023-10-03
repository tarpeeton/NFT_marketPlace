const router = require("express").Router()
const defaultModel = require("../../model/userModel")

router.get("/" , async ( req , res , next ) => {
  
    res.render(
        "../views/pages/client/client.ejs",
        {
            layout: "../views/layouts/client.layout.ejs",
            title: "Nfs Marketplace"
        }
    )
})
router.get("/sign_up" , async ( req , res , next ) => {
  
    res.render(
        "../views/pages/auth/sign_up.ejs",
        {
            layout: "../views/layouts/auth.Layout.ejs",
            title: " Sign  Up  "
        }
    )
})
router.get("/sign_in" , async ( req , res , next ) => {
  
    res.render(
        "../views/pages/auth/sign_in.ejs",
        {
            layout: "../views/layouts/auth.Layout.ejs",
            title: " Sign  in "
        }
    )
})
router.get("/reset_password" , async ( req , res , next ) => {
  
    res.render(
        "../views/pages/auth/resetPassword.ejs",
        {
            layout: "../views/layouts/auth.Layout.ejs",
            title: " Reset Password "
        }
    )
})
router.get("/password/:uuid", async (req, res, next) => {
    const { uuid } = req.params;
    const user = await defaultModel.findOne({ uuid: uuid }).lean()
    if (!user || user == null) {
        return res.redirect("/404")
    }
    else {
        res.render("./pages/auth/newPassword.ejs", { layout: "./layouts/auth.Layout.ejs", title: "Enter new password 😉" })
    }
})

module.exports = router