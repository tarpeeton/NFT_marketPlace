const mongoose = require('mongoose');

const NftSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String , required:true},
    userID: { type: mongoose.Types.ObjectId, ref: "userModel", index: true, required: true },
    price: { type: Number , required:true},
    image: [{ type: String , required:true }],
    createdAt: {
        type: Date,
        default: Date.now // Set the default value to the current date and time
      }
})


module.exports = mongoose.model("NFT", NftSchema)