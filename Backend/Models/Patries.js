import mongoose from "mongoose";

const PatriesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  order: { type: Number, required: true },
  date: { type: String, required: true },
});

const Patries = mongoose.model("Patries", PatriesSchema);

export default Patries;