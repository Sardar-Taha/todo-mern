const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);
