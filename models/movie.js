const mongoose = require("mongoose");
// create mongoose schema for movies
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, minLength: 2 },
  watchList: Boolean,
});

movieSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});
// create and export mongoose Movie Model
module.exports = mongoose.model("Movie", movieSchema);
