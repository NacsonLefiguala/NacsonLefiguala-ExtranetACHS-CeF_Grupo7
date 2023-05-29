"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'usuarios'
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  rut: {
    type: String,
    required: true,
    unique: true,
  },

  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],

  userId: {
    type: String,
    required: true,
    unique: true,
  },
  //-----------------------------------
  // los administradores puedan designar fecha, hora y sede para los 
  // exámenes médicos que los brigadistas deben realizar

  medicalExamDate: {
    type: Date,
    default: null,
  },
  medicalExamTime: {
    type: String,
    default: null,
  },
  medicalExamLocation: {
    type: String,
    default: null,
  },

  //-----------------------------------
  //-----------------------------------
  // los brigadistas pueden subir examemenes medicos en formato PDF 
  // y que los administradores puedan buscar los examenes por el rut

  medicalExamFile: {
    type: String,
    default: null,
  },

  //-----------------------------------

  //-----------------------------------
  //estado de examen medico
  medicalExamStatus: {
    type: String,
    enum: ["pendiente", "aprobado", "rechazado"],
    default: "pendiente",
  },
  //-----------------------------------

});


// Crea el modelo de datos 'User' a partir del esquema 'userSchema'
const User = mongoose.model("User", userSchema);

// Exporta el modelo de datos 'User'
module.exports = User;
