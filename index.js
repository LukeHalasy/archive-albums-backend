const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const MONGO_USER = (process.env.NODE_ENV == "prod") ? process.env.MONGO_INITDB_ROOT_USERNAME : "luke";
const MONGO_PASSWORD = (process.env.NODE_ENV == "prod") ? process.env.MONGO_INITDB_ROOT_PASSWORD : "luke";
const MONGO_IP = (process.env.NODE_ENV == "prod") ? process.env.MONGO_IP : "mongo";
const MONGO_PORT = (process.env.NODE_ENV == "prod") ? process.env.MONGO_PORT : 27017; 

const userRouter = require('./routes/userRoutes');
const albumsRouter = require('./routes/albumRoutes');
const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
mongoose
  .connect(mongoURL)
  .then(() => console.log("Succesfully connected to DB"))
  .catch((e) => console.log(e))


app.use(express.json());
app.get('/api/v1', (req, res) => {
  res.send("<h2> Hello Docker Test </h2>")
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/albums", albumsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`))


