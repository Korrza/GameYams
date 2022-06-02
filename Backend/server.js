import dotenv from "dotenv";
import express from "express";
import { createSecureServer } from "http2";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import crypto from "crypto";
import cors from "cors";

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
    origin: 'http://localhost:4200'
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

// take params from the form and replace the patrie in the database
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

// ==========
// App start
// ==========

app.listen(APP_PORT, () => {
  console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
});
