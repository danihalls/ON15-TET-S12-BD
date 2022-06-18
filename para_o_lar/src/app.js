const express = require("express");

require("dotenv").config();

const cors = require("cors");

const db = require("./database/mongooseConnect")
const artistRoutes = require("./routes/artistsRoutes");

const app = express()



app.use(express.json())
app.use(cors())

db.connect()

app.use("/artist", artistRoutes)

module.exports = app