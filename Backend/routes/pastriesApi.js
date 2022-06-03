import mongoose from "mongoose";

// récupération des données de l'api
export function getApi(req, res) {
    mongoose.connection.db.collection("patries").find({}).toArray(function (err, result) {
        if (err) throw err;
        return res.send(result);
    });
}

// modification des données de l'api
export function putApi(req, res) {
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
}