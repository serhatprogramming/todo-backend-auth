const mongoose = require("mongoose");
// create mongoose schema for todos
const todoSchema = new mongoose.Schema({
  task: { type: String, required: true, minLength: 2 },
  done: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

todoSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});
// create and export mongoose Todo Model
module.exports = mongoose.model("Todo", todoSchema);
