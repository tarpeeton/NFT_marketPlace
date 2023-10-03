/* Copyright (C) 2023 Kidiraliyev Rustam - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the XYZ license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the XYZ license with
 * this file. If not, please write to: , or visit :
 */


const mongoose = require('mongoose');

const defaultSchema = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String },
    balance: { type: Number, default: 0 },
    role: { type: String, required: true, enum: ["admin",  "moderator"] , default: 'user' },
    image: { type: String  },
    uuid: { type: String , required: true },
})



module.exports = mongoose.model("user", defaultSchema)