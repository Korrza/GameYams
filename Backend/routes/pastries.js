module.exports = {

    getApi: function () {
        app.get('/api/patries', (req, res) => {
            mongoose.connection.db.collection("patries").find({}).toArray(function (err, result) {
                if (err) throw err;
                // console.log(result);
                return res.send(result);
            });
        });
    },
    modifyApi: function() {
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
    }
}