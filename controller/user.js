const defaultmodel = require("../model/userModel")
// const { ErrorCallback , SuccessCallback } = require("../config/callback")
const bcrypt = require("bcrypt")
const {SECRET_KEY , SECRET_TIME} = require("../config/default");
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const fs = require('fs');


//         REGISTER 

exports.register = async (req, res, next) => {
  try {
    const folderName = "./public/uploads"
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, folderName);
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '.jpg');
      }
    });

    const upload = multer({ storage: storage }).array('image', 10);
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ success: false, message: 'Error uploading image' });
      } else if (err) {
        return res.status(400).json({ success: false, message: 'Error uploading image' });
      }

      const { name, email, password, role } = req.body;
      const filenames = req.files.map(file => file.filename);
      const user = await defaultmodel.find({ email: email });
      const salt = bcrypt.genSaltSync(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      if (user.length == 0) {
        const result = new defaultmodel({
          name: name,
          email: email,
          role: role,
          password: hashedPassword,
          image: filenames,
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
//         KIRISH
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
        if (!checkPassword  || checkPassword == false ) {
            res.json({success: false , message: "Parol yoki email  xato iltimos boshqatdan kiriting"})
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
             req.session.role =  user.role;
             req.session.uuid = user.uuid
             req.session.save()


             
             res.json({ success: true , token: token , role: role , uuid: uuid })

        }
    }
}
//         sms Yuborish uchun
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
//         Yangi Parol uchun
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
exports.getAllDatasUsers = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1; // Sahifani raqami
  const limit = 7; // Sahifadagi elementlar soni

  try {
    const count = await defaultmodel.countDocuments(); // Malumotlar sonini hisoblash
    const totalPages = Math.ceil(count / limit); // Jami sahifalar soni

    const skip = (page - 1) * limit; // O'tkaziladigan malumotlar soni

    const data = await defaultmodel.find().skip(skip).limit(limit).lean(); // Malumotlarni olish

    res.json({ data, totalPages });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
exports.getSingleData = async ( req , res , next ) => {
    try {
        const { uuid } = req.params;
        const user = await defaultmodel.findOne({ uuid }).select({uuid:1 , name: 1 , email: 1 , image: 1 , role: 1});
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
// tahrirlash Alohida File siz  REJIME 
exports.updateUser = async (req, res) => {
    try {
      const { uuid } = req.params;
      const { name, email, role } = req.body;
  
      const user = await defaultmodel.findOneAndUpdate({ uuid }, { name, email, role,  }, { new: true });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
exports.deleteUser = async (req, res) => {
    try {
      const { uuid } = req.params;
  
      const user = await defaultmodel.findOneAndDelete({ uuid });
  
      if (!user) {
        return res.status(404).json({ message: 'Malumot ochirilgan' });
      }
  
      // Delete the associated image
      const imagePath = path.join(__dirname, '..', 'public', 'uploads', user.image[0]);
      fs.unlink(imagePath, (error) => {
        if (error) {
          console.error(error);
        }
      });
  
      res.status(200).json({ message: 'Malumot topilmadi' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
exports.searchUser = async ( req , res , next ) => {
    const name = req.query.name; // Nom bo'yicha filtr
    const filter = {}; // Filtrlar obyekti
  
    if (name) {
      filter.name = name;
    }

    defaultmodel.find(filter, (err, malumotlar) => {
      if (err) {
        console.log('Malumotlarni olishda xatolik yuz berdi:', err);
        res.status(500).send('Serverda xatolik yuz berdi');
      } else {
        res.json(malumotlar)
      }
    });
  
}
exports.logOut = async (req, res, next) => {
  req.session.destroy()
  res.clearCookie("connect.sid")
  res.json({
      message: "Session is deleted"
  })
}

  
