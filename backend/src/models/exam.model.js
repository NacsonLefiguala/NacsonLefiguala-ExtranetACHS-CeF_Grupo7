"use strict";
const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  archivo: {
    type: String,
    required: true,
  },
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
