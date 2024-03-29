const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const session = require('express-session')
const redis = require('redis')
const cors = require('cors')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

console.log(process.env.NODE_ENV);
const REDIS_URL = (process.env.NODE_ENV == "prod") ? process.env.REDIS_URL : "redis://redis:6379";
console.log(REDIS_URL);
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
console.log(mongoURL);

mongoose
  .connect(mongoURL)
  .then(() => console.log("Succesfully connected to DB"))
  .catch((e) => console.log(e))


app.set('trust proxy', 1);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}))
app.use(methodOverride())

console.log(process.env.FRONTEND_URL);
if (process.env.NODE_ENV != "prod") {
  app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['POST', 'PUT', 'GET', 'DELETE'],
    credentials: true
  }))
}

app.use(session({
  store: new RedisStore({client: redisClient}),
  secret: SESSION_SECRET,
  cookie: {
    secure: (process.env.NODE_ENV == "prod") ? true : false, // set to true in prod!
    SameSite: 'none',
    resave: false,
    httpOnly: true,
    saveUninitialized: true,
    maxAge: 6000000 // milliseconds
  } 
}))

app.get('/api/v1', (req, res) => {
  res.send("<h2> Hello Docker Test </h2>")
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/albums", albumsRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port ${port}`))


