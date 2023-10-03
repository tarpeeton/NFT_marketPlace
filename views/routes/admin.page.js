const router = require("express").Router();


router.get("/sign_up_admin" , async ( req , res , next ) => {
  
    res.render(
        "../views/pages/auth/sign_up.ejs",
        {
            layout: "../views/layouts/admin.Layout.ejs",
            title: " Sign  Up  "
        }
    )
})
router.get("/sign_in_admin" , async ( req , res , next ) => {
  
    res.render(
        "../views/pages/auth/sign_in.ejs",
        {
            layout: "../views/layouts/admin.Layout.ejs",
            title: " Sign  in "
        }
    )
})
router.get("/404_admin" , async ( req , res , next ) => {
  
    res.render(
        "../views/pages/auth/404.ejs",
        {
            layout: "../views/layouts/admin.Layout.ejs",
            title: " 404"
        }
    )
})
router.get("/admin/dashboard/:uuid" , async ( req , res , next ) => {
 

        res.render(
            "../views/pages/admin/adminDashboard.ejs",
            {
                layout: "../views/layouts/admin.Layout.ejs",
                title: " Admin Dashboard",
                 
            }
        )
    }
  
)
router.get("/top/creators" , async ( req , res , next ) => {
  
    res.render(
        "../views/pages/admin/topCreators.ejs",
        {
            layout: "../views/layouts/admin.Layout.ejs",
            title: "Nfs Marketplace - ADMIN"
        }
    )
})
router.get("/admin/all/users" , async ( req , res , next ) => {
  
    res.render(
        "../views/pages/admin/AllUsers.ejs",
        {
            layout: "../views/layouts/admin.Layout.ejs",
            title: "Nfs Marketplace - Create"
        }
    )
})
router.get("/admin/create/new/file" , async ( req , res , next ) => {
  
    res.render(
        "../views/pages/admin/CreateNFT.ejs",
        {
            layout: "../views/layouts/admin.Layout.ejs",
            title: "Nfs Marketplace - Create"
        }
    )
})
router.get("/admin/profile" , async ( req , res , next ) => {
  
    res.render(
        "../views/pages/admin/profil.ejs",
        {
            layout: "../views/layouts/admin.Layout.ejs",
            title: "Nfs Marketplace - profile"
        }
    )
})


module.exports = router