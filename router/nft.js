const express = require('express');
const router = express.Router();
const NftController = require("../controller/nft")


// malumot yaratish
router.post("/api/nft/create" ,  NftController.CreateNFT)
// Malumotni olish
router.get('/nft/:id', NftController.GetSingle);




module.exports = router  