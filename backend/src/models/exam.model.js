"use strict";
const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  file: {
    data: Buffer,
    contentType: String,
  },
});

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;
