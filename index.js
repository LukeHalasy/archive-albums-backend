const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const session = require('express-session')
const redis = require('redis')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const REDIS_URL = (process.env.NODE_ENV == "prod") ? process.env.REDIS_URL : "redis://redis:6379";
const SESSION_SECRET = (process.env.NODE_ENV == "prod") ? process.env.SESSION_SECRET : "secret";

var RedisStore = require('connect-redis')(session)

var redisClient = redis.createClient({
  url: REDIS_URL,
  legacyMode: true
})

redisClient.connect();

redisClient.on('connect', () => console.log('::> Redis Client Connected'));
redisClient.on('error', (err) => console.log('<:: Redis Client Error', err));

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
app.use(bodyParser.urlencoded({ extended: true}))
app.use(methodOverride())

app.use(session({
  store: new RedisStore({client: redisClient}),
  secret: SESSION_SECRET,
  cookie: {
    secure: (process.env.NODE_ENV == "prod") ? true : false, // set to true in prod!
    resave: false,
    saveUninitialized: false,
    httpOnly: true, 
    maxAge: 6000000 // milliseconds
  } 
}))

app.get('/api/v1', (req, res) => {
  res.send("<h2> Hello Docker Test </h2>")
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/albums", albumsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`))


