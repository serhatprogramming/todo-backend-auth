const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  passwordHash: String,
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    // do not include the passwordhash
    delete ret.passwordHash;
  },
});

// Apply the uniqueValidator plugin to the schema
userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

module.exports = User;
