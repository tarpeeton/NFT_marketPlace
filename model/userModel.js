const mongoose = require('mongoose');

const defaultSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String ,  },
    balance: { type: Number, default: 0 },
    role: { type: String, required: true, enum: ["admin", "user"], default: 'user' },
    image: [{ type: String}],
    uuid: { type: String  },
    createdAt: {
        type: Date,
        default: Date.now // Set the default value to the current date and time
      }
})


module.exports = mongoose.model("user", defaultSchema)