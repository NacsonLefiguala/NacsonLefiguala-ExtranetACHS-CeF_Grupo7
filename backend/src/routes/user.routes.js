"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de usuarios
const userController = require("../controllers/user.controller.js");
// Importa el middleware de autorización
const authoMiddleware = require("../middlewares/autho.middleware.js");
const autheMiddleware = require("../middlewares/authe.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para los usuarios
router.get("/", userController.getUsers);
router.post("/", authoMiddleware.isAdmin, userController.createUser);
router.get("/:id", userController.getUserById);
router.put("/:id", authoMiddleware.isAdmin, userController.updateUser);
router.delete("/:id", authoMiddleware.isAdmin, userController.deleteUser);
//-----------------------------------
// los administradores puedan designar fecha, hora y sede para los 
// exámenes médicos que los usuarios deben realizar

router.post("/:userId/medical-exam", authoMiddleware.isAdmin,
  userController.assignMedicalExam);

//-----------------------------------

//-----------------------------------
// los brigadistas pueden subir exaemenes medicos en formato PDF 
// y que los administradores puedan buscar los examenes por el rut

router.post("/:userId/medical-exam/upload", authoMiddleware.isAuthenticated, userController.uploadMedicalExam);
router.get("/medical-exam/:rut", authoMiddleware.isAdmin, userController.reviewMedicalExam);
//-----------------------------------

//-----------------------------------
//cambio de estado de los examenes medicos por administrador
//y revision de los brigadistas de sus examenes medicos

// Ruta para subir el examen médico
router.post(
  "/:userId/upload-medical-exam",
  authoMiddleware.verifyToken,
  userController.uploadMedicalExam
);

// Ruta para actualizar el estado del examen médico (solo para administradores)
router.put("/:userId/medical-exam-status", autheMiddleware.verifyToken, authoMiddleware.isAdmin, userController.updateMedicalExamStatus);
// Ruta para obtener el estado del examen médico
router.get("/:userId/medical-exam-status", autheMiddleware.verifyToken, userController.getMedicalExamStatus);

//-------------------------------------
const authMiddleware = require("../middlewares/auth.middleware");

// Ruta para subir el examen médico
router.post(
  "/:userId/upload-medical-exam",
  authMiddleware.verifyToken,
  userController.uploadMedicalExam
);

// Ruta para revisar los exámenes médicos (solo para administradores)
router.get(
  "/:userId/medical-exams",
  authMiddleware.verifyToken,
  authMiddleware.isAdmin,
  userController.getMedicalExams
);

// Ruta para subir el examen médico
router.post(
  "/:userId/upload-medical-exam",
  authMiddleware.verifyToken,
  userController.uploadMedicalExam
);

// Ruta para revisar los exámenes médicos (solo para administradores)
router.get(
  "/:userId/medical-exams",
  authMiddleware.verifyToken,
  authMiddleware.isAdmin,
  userController.getMedicalExams
);

module.exports = router;

// Exporta el enrutador
module.exports = router;
