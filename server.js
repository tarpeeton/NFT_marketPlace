/* Copyright (C) 20223 Kidiraliyev Rustam - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the XYZ license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the XYZ license with
 * this file. If not, please write to: , or visit :
 */



// Requirement
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const fs = require("fs");
const path = require('path')
const bodyParser = require("body-parser")
const cors = require('cors')
const expressSession = require("express-session");
const mongodbConnectSession = require("connect-mongodb-session")(expressSession)
const expressEjsLayouts = require("express-ejs-layouts")
const cookieParser = require("cookie-parser")
const { PORT, DATABASE_OPTION, DATABASE_URL, SECRET_KEY, SECRET_TIME, COLLECTION } = require("./config/default");

// Sessiya TEST REJIME
const session = expressSession({
    secret: SECRET_KEY,
    saveUninitialized: false,
    store: new mongodbConnectSession({
        uri: DATABASE_URL,
        collection: COLLECTION,
    }),
    resave: false,
    cookie: {
        maxAge: SECRET_TIME,
        httpOnly: true,
        sameSite: "strict"
    }
})

app.use(bodyParser.json());
app.use(session)

// Middleware
app.use(cors({ origin: "*" }))
app.use(expressEjsLayouts)
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")


/* Routers Fronrtend */
app.use("/", require("./views/routes/landing.page"))
app.use(require("./views/routes/admin.page.js"))
app.use(express.static("uploads"));
/* Routers Backend */
app.use(require("./router/client"))
app.use(require("./router/admin"))
app.use(require("./router/admin"))




// Connection Database and Server;
const server = app.listen(PORT, () => console.log("Server is connected", server.address().port))
const database = async () => {
    try {
        await mongoose.connect(DATABASE_URL, DATABASE_OPTION)
        console.log("Database connected")
    }
    catch (error) {
        console.log("Error On Database", error.message)
    }
}
const create_folder = async () => {
    fs.mkdir(path.join(__dirname, "./public"), (error) => { })
}
database()
create_folder()



