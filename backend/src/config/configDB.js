"use strict";
const mongoose = require("mongoose");
const { configEnv } = require("./configEnv.js");
const { handleError } = require("../utils/errorHandler");

async function setupDB() {
  try {
    const { DB_URL } = configEnv();
    console.log(configEnv()) // Se obtiene la variable de entorno DB_URL correctamente
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("=> Conectado a la base de datos");
  } catch (err) {
    handleError(err, "/configDB.js -> setupDB");
    throw new Error(err);
  }
}

module.exports = { setupDB };
