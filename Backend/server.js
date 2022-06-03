import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import * as pastriesApi from "./routes/pastriesApi.js";
import * as usersApi from "./routes/usersApi.js";

// ==========
// App initialization
// ==========

mongoose.connect(
  "mongodb://localhost:27017/patries",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to MongoDB")
);

dotenv.config();
const { APP_HOSTNAME, APP_PORT, NODE_ENV, SECRET } = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());

app.set("view engine", "pug");
app.locals.pretty = (NODE_ENV !== 'production');
app.use(bodyParser.urlencoded({ extended: true }));

// ==========
// App middlewares
// ==========

app.use(express.static(path.join(__dirname, "public")));

// ==========
// App routers
// ==========


app.get('/api/patries', (req, res) => {
  pastriesApi.getApi(req, res)
});

app.put('/api/patries', async (req, res) => {
  pastriesApi.putApi(req,res);
});

app.get('/api/users', (req, res) => {
  usersApi.getUsersApi(req,res);
});

let errors = [];

app.post('/api/register', (req, res) => {
  usersApi.postRegisterUser(req,res);
});

app.post('/api/login', (req, res) => {
  usersApi.postLoginUser(req,res);
});

// ==========
// App start
// ==========

app.listen(APP_PORT, () => {
  console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
});
