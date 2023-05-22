"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Importa el enrutador de usuarios
const userRoutes = require("./user.routes.js");
// Importa el enrutador de examenes
const examRoutes = require("./exam.routes.js");
// Importa el enrutador de autenticación
const authRoutes = require("./auth.routes.js");

// Importa el middleware de autenticación
const authMiddleware = require("../middlewares/authe.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authMiddleware.verifyToken, userRoutes);
router.use("/exam", authMiddleware.verifyToken, examRoutes);

// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);

// Exporta el enrutador
module.exports = router;
