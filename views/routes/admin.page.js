const router = require("express").Router();
const { auth, roles } = require("../middlewares/protectHandler")


router.get("/sign_up_admin" ,auth, roles("admin"), async ( req , res , next ) => {
  
    res.render(
        "../views/pages/auth/sign_up.ejs",
        {
            layout: "../views/layouts/admin.Layout.ejs",
            title: " Sign  Up  "
        }
    )
})
router.get("/sign_in_admin",auth, roles("admin") , async ( req , res , next ) => {
  
    res.render(
        "../views/pages/auth/sign_in.ejs",
        {
            layout: "../views/layouts/admin.Layout.ejs",
            title: " Sign  in "
        }
    )
})
router.get("/404_admin",auth, roles("admin") , async ( req , res , next ) => {
  
    res.render(
        "../views/pages/auth/404.ejs",
        {
            layout: "../views/layouts/admin.Layout.ejs",
            title: " 404"
        }
    )
})
router.get("/admin/dashboard/:uuid",auth, roles("admin") , async ( req , res , next ) => {
 

        res.render(
            "../views/pages/admin/adminDashboard.ejs",
            {
                layout: "../views/layouts/admin.Layout.ejs",
                title: " Admin Dashboard",
                 
            }
        )
    }
  
)
router.get("/top/creators",auth, roles("admin") , async ( req , res , next ) => {
  
    res.render(
        "../views/pages/admin/topCreators.ejs",
        {
            layout: "../views/layouts/admin.Layout.ejs",
            title: "Nfs Marketplace - ADMIN"
        }
    )
})
router.get("/admin/all/users",auth, roles("admin") , async ( req , res , next ) => {
  
    res.render(
        "../views/pages/admin/AllUsers.ejs",
        {
            layout: "../views/layouts/admin.Layout.ejs",
            title: "Nfs Marketplace - Create"
        }
    )
})
router.get("/user/search" ,auth, roles("admin"), async ( req , res , next ) => {
  
    res.render(
        "../views/pages/admin/profile.ejs",
        {
            layout: "../views/layouts/admin.Layout.ejs",
            title: "User Profile"
        }
    )
})
router.get("/Create/Nft" ,auth, roles("admin"), async ( req , res , next ) => {
  
    res.render(
        "../views/pages/admin/CreateNFT.ejs",
        {
            layout: "../views/layouts/admin.Layout.ejs",
            title: "Create NFT"
        }
    )
})



module.exports = router