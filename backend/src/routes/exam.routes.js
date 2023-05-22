"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de usuarios
const examController = require("../controllers/exam.controller.js");
// Importa el middleware de autorización
const authoMiddleware = require("../middlewares/autho.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para los usuarios
router.get("/", examController.getExams);
router.post("/", authoMiddleware.isAdmin, examController.createExam);
router.get("/:id", examController.getExamById);
router.put("/:id", authoMiddleware.isAdmin, examController.updateExam);
router.delete("/:id", authoMiddleware.isAdmin, examController.deleteExam);

// Exporta el enrutador
module.exports = router;
