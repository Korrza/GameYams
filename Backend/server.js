import dotenv from "dotenv";
import express from "express";
import { createSecureServer } from "http2";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import crypto from "crypto";
import cors from "cors";
import User from "./Models/User.js";

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
  mongoose.connection.db.collection("patries").find({}).toArray(function (err, result) {
      if (err) throw err;
      // console.log(result);
      return res.send(result);
  });
});

app.put('/api/patries', async (req, res) => {
  console.log("test",req.body);
  const { name, number, order, date } = req.body;

  const patrie = {
      name,
      number,
      order,
      date
  };

  mongoose.connection.db.collection("patries").updateOne({ name: name }, { $set: patrie }, function (err, result) {
      if (err) throw err;
      return res.send(result);
  });
});



app.get('/api/users', (req, res) => {
  mongoose.connection.db.collection("users").find({}).toArray(function (err, result) {
      if (err) throw err;
      // console.log(result);
      return res.send(result);
  });
});

let errors = [];

app.post('/api/register', (req, res) => {
  console.log(req.body)
  let newUser = new User({
    firstName: req.body.firstName,
    email: req.body.email,
    password: req.body.password,
  });

  const hasher = crypto.createHmac("sha256", SECRET);
  const hash = hasher.update(newUser.password).digest("hex");

  if (newUser.email.length === 0) {
    errors.push({
      title: "Donnée manquante",
      message: "Veuillez renseigner votre email",
    });
    return;
  }

  if (newUser.password.length === 0) {
    errors.push({
      title: "Donnée manquante",
      message: "Veuillez renseigner votre mot de passe",
    });
    return;
  }

  User.findOne({ email: newUser.email }, (err, user) => {
    if (err) throw err;
    if (user) {
      errors.push({
        title: "Email déjà utilisé",
        message: "Veuillez utiliser un autre email",
      });
      return;
    }
    newUser.password = hash;
    newUser.save();
  });
});

app.post('/api/login', (req, res) => {
  console.log(req.body.password)
  let newUser = new User({
    email: req.body.email,
    password: req.body.password,
  });

  const hasher = crypto.createHmac("sha256", SECRET);
  const hash = hasher.update(newUser.password).digest("hex");

  if (newUser.email.length === 0) {
    errors.push({
      title: "Donnée manquante",
      message: "Veuillez renseigner votre email",
    });
    return;
  }

  if (newUser.password.length === 0) {
    errors.push({
      title: "Donnée manquante",
      message: "Veuillez renseigner votre mot de passe",
    });
    return;
  }

  User.findOne({ email: newUser.email }, (err, user) => {
    if (err) throw err;
    if (user) {
      if (user.password === hash && user.email === newUser.email) {
        console.log("ok")
        return res.send(user);
      } else {
        errors.push({
          title: "Mot de passe incorrect",
          message: "Veuillez utiliser un autre mot de passe",
        });
        console.log("mdp incorrect")
        return;
      }
    } else {
      console.log("email incorrect");
    }
  });
});

// ==========
// App start
// ==========

app.listen(APP_PORT, () => {
  console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
});
