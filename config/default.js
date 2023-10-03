/* Copyright (C) 2023 Kidiraliyev Rustam - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the XYZ license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the XYZ license with
 * this file. If not, please write to: , or visit :
 */

module.exports = {
    PORT: 4000,
    DATABASE_URL: "mongodb://127.0.0.1:27017/nft",
    DATABASE_OPTION: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    },
    SECRET_KEY: "b85fa29e835f302753ec2a2b84505f959f2e41b1",
    SECRET_TIME: 1000 * 60 * 60 * 2,
    COLLECTION: "session",
}

