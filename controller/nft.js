const NftModel = require("../model/nft_create")
const multer = require("multer");

const path = require('path');
const fs = require('fs');



// Create NFT 
exports.CreateNFT = async ( req , res , next ) => {
    try {
        const folderName = "./public/nft"
        const storage = multer.diskStorage({
          destination: function (req, file, cb) {
            cb(null, folderName);
          },
          filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + '.jpg');
          }
        });
    
        const upload = multer({ storage: storage }).array('image', 2);
        upload(req, res, async function (err) {
          if (err instanceof multer.MulterError) {
            return res.status(400).json({ success: false, message: 'Error uploading image' });
          } else if (err) {
            return res.status(400).json({ success: false, message: 'Error uploading image' });
          }
    
          const { name, description, userID, price } = req.body;
          const filenames = req.files.map(file => file.filename);
    
            const result = new NftModel({
              name: name,
              description: description,
              userID: userID,
              price: price,
              image: filenames,
            });
    
            await result.save();
            res.json({ success: true, message: 'Nft Yaratildi' });
        });
      } catch (error) {
        res.json({ success: false, message: error.message });
      }


}
exports.GetSingle = async (req, res, next) => {
    try {
    const nft = await NftModel.findById({_id: req.params.id});
    if (!nft) {
    return res.status(404).json({ success: false, message: 'NFT not found' });
    }
    res.json({ success: true, data: nft });
    } catch (error) {
    res.json({ success: false, message: error.message });
    }
    };
