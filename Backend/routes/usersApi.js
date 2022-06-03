import mongoose from "mongoose";
import User from "../Models/User.js";
import crypto from "crypto";
import dotenv from "dotenv";

let errors = [];
dotenv.config();
const { SECRET } = process.env;

// récupération des données de l'api
export function getUsersApi(req, res) {
    mongoose.connection.db.collection("users").find({}).toArray(function (err, result) {
        if (err) throw err;
        return res.send(result);
    });
}
  
// inscrit un utilisateur
export function postRegisterUser(req, res) {

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
}

// connecte un utilisateur
export function postLoginUser(req, res) {
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
          return res.send(user);
        } else {
          errors.push({
            title: "Mot de passe incorrect",
            message: "Veuillez utiliser un autre mot de passe",
          });
          return;
        }
      } else {
      }
    });
}