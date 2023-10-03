const userModel = require("../model/userModel")
const multer = require("multer")


// multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.filename);
    }
  });


const CreateUSer  =  async  ( req , res , next  ) => {
    const user = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        image: req.file.filename
    });
    user.save((err) => {
        if (err) {
         res.json({message: err.message })   
        }else {
            res.json({msg: "Malumot yaratildi"})
           
        }
    })
}

module.exports = { CreateUSer  };

