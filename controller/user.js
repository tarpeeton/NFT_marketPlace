const defaultmodel = require("../model/userModel")
// const { ErrorCallback , SuccessCallback } = require("../config/callback")
const bcrypt = require("bcrypt")
const {SECRET_KEY , SECRET_TIME} = require("../config/default");
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const multer = require("multer")


//         REGISTER 

exports.register = async (req, res, next) => {
    try {
    const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '.jpg');
    }
    });

    const upload = multer({ storage: storage }).single('image');
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ success: false, message: 'Error uploading image' });
      } else if (err) {
        return res.status(400).json({ success: false, message: 'Error uploading image' });
      }
    
      const { name, email, password, role } = req.body;
      const filename = req.file.filename;
      const user = await defaultmodel.find({ email: email });
      const salt = bcrypt.genSaltSync(12);
      const hashedPassword = await bcrypt.hash(password, salt);
    
      if (user.length == 0) {
        const result = new defaultmodel({
          name: name,
          email: email,
          password: hashedPassword,
          image: filename,
          role: role,
          uuid: uuidv4()
        });
    
        await result.save();
        res.json({ success: true, message: 'Siz avtorizatsiyadan otingiz' });
      } else {
        res.json({ success: false, message: 'Bunday foydaluvchi mavjud' });
      }
    });
    } catch (error) {
    res.json({ success: false, message: error.message });
    }
    };
exports.login = async (req , res , next ) => {
    const { email , PASSWORD } = req.body;

    const user = await defaultmodel.findOne({
        email: email
    }).select({ password: 1 , role: 1 , uuid: 1})

    if(user == null || !user ){
        res.json({ success: false , message: "Bunday email manzili mavjud emas"})
    }
    else{
        const password = user.password
        const checkPassword = await bcrypt.compare( PASSWORD , password  );
        if (checkPassword == false || !checkPassword ) {
            res.json({success: false , message: "Parol yoki xato iltimos boshqatdan kiriting"})
        }
        else{

            //  token yaratish 
            const token = jwt.sign(
                {role: user.role ,},
                SECRET_KEY,
                { expiresIn: SECRET_TIME}
            )
            const role = user.role
            const uuid = user.uuid
             // SESSIYA YARATISH
             
             req.session.auth = true 
             req.session.role = user.role
             req.session.uuid = user.uuid
             req.session.save()
             
             res.json({ success: true , token: token , role: role , uuid: uuid })

        }
    }
}
exports.ResetPassword = async ( req , res , next  ) =>  {
    const user = await defaultmodel.findOne({email: req.body.EMAIL}).select({email: 1 , uuid: 1})
    if(!user) {
        res.json({success: false , message: "Bunday Email Mavjud emas"})
    }else{

        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        const randoms = (array) => {
            return String(array[Math.floor(Math.random() * array.length)])
        }
        const random_code = randoms(numbers) + randoms(numbers) + randoms(numbers) + randoms(numbers)
        function sendSMS(send) {
            const transporter = nodemailer.createTransport({
                service: "gmail" ,
                auth: {
                    user: "samatrustem@gmail.com",
                    pass: "layygyzcfddvplgl"
                }
            });
            const mailOptions = {
                from: "samatrustem@gmail.com",
                to: req.body.EMAIL,
                subject: "Parolni Tiklash",
                html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    
                </head>
                <body>
                <div class="auth">
                <div class="auth_forms">
                    <div class="auth_header">
                        <h2 style="text-align: center; font-size: 40px;">Reset Password</h2>
                    </div>
                    <div class="auth_description">
                    <a href = "http://localhost:4000">
                    <h3 style="text-align: center; font-size: 25px;">A password reset code has been provided.</h3>
                    </a>   
                    </div>
                    <div class="forms">
                        <div class="inputs_icon" style="width: 80%; margin: 0 20%;">
                            <h1 style="font-size: 60px; width: 80%; text-align:center;" >  ${random_code} </h1>
                        </div>
                </div>
            </div>
                </body>
                </html> `,
            };
            

            transporter.sendMail(mailOptions, function(error , info ){
                if(error){
                    res.json({success: false , message: "Frontdan xatolik"})
            
                }else{

                     res.json({success: true , data: user , random_code , })
                }
            })
        }
        sendSMS()

    }
}
exports.recoverPassword = async (req, res, next) => {
    try {
        const { uuid } = req.params;
        const { PASSWORD } = req.body;
        // Parolni hashlash
        const salt = await bcrypt.genSaltSync(12)
        const hashedPassword = await bcrypt.hash(PASSWORD, salt);
        const user = await defaultmodel.findOne({ uuid: uuid })
        user.password = hashedPassword
        await user.save()
        res.json({ success: true, data: user })
        
    }
    catch (error) {
        res.json({ success: false, data: "Error" })
    }
}
// hamma userlarni olish
exports.getAllDatasUsers = async ( req , res , next ) => {
    const data = await defaultmodel.find().lean()
    res.json(data)
}
// tahrirlash TEST REJIME 
exports.UpdateProfile = async ( req , res , next ) => {
    try {
        const { uuid } = req.params;
        const { NAME } = req.body;
        // Parolni hashlash
        const user = await defaultmodel.findOneAndUpdate({ uuid: uuid })
        user.name = NAME
        await user.save()
        res.json({ success: true, data: user })
        
    }
    catch (error) {
        res.json({ success: false, data: "Error" })
    }
}
// controllers/defaultController.js

