"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const ExamService = require("../services/exam.service");
const { handleError } = require("../utils/errorHandler");

/**
 * @name getExams
 * @description Obtiene todos los exámenes
 * @param req {Request}
 * @param res {Response}
 */
async function getExams(req, res) {
  try {
    const exams = await ExamService.getExams();
    exams.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, exams);
  } catch (error) {
    respondError(req, res, 400, error.message);
  }
}

/**
 * @name createExam
 * @description Crea un nuevo examen
 * @param req {Request}
 * @param res {Response}
 */
async function createExam(req, res) {
  try {
    const nuevoExamen = await ExamService.createExam(req.body);
    nuevoExamen === null
      ? respondError(
          req,
          res,
          400,
          "Error en la validación de datos",
          "Bad Request",
          { message: "Verifique los datos ingresados" },
        )
      : respondSuccess(req, res, 201, nuevoExamen);
  } catch (error) {
    handleError(error, "exam.controller -> createExam");
    respondError(req, res, 500, "No se pudo crear el examen");
  }
}

/**
 * @name getExamById
 * @description Obtiene un examen por su id
 * @param req {Request}
 * @param res {Response}
 */
async function getExamById(req, res) {
  try {
    const { id } = req.params;
    const exam = await ExamService.getExamById(id);
    exam === null
      ? respondError(
          req,
          res,
          404,
          "No se encontró el examen solicitado",
          "Not Found",
          { message: "Verifique el ID ingresado" },
        )
      : respondSuccess(req, res, 200, exam);
  } catch (error) {
    handleError(error, "exam.controller -> getExamById");
    respondError(req, res, 500, "No se pudo obtener el examen");
  }
}

/**
 * @name updateExam
 * @description Actualiza un examen por su id
 * @param req {Request}
 * @param res {Response}
 */
async function updateExam(req, res) {
  try {
    const { id } = req.params;
    const exam = await ExamService.updateExam(id, req.body);
    exam === null
      ? respondError(
          req,
          res,
          404,
          "No se encontró el examen solicitado",
          "Not Found",
          { message: "Verifique el ID ingresado" },
        )
      : respondSuccess(req, res, 200, exam);
  } catch (error) {
    handleError(error, "exam.controller -> updateExam");
    respondError(req, res, 500, "No se pudo actualizar el examen");
  }
}

/**
 * @name deleteExam
 * @description Elimina un examen por su id
 * @param req {Request}
 * @param res {Response}
 */
async function deleteExam(req, res) {
  try {
    const { id } = req.params;
    const exam = await ExamService.deleteExam(id);
    exam === null
      ? respondError(
          req,
          res,
          404,
          "No se encontró el examen solicitado",
          "Not Found",
          { message: "Verifique el ID ingresado" },
        )
      : respondSuccess(req, res, 200, exam);
  } catch (error) {
    handleError(error, "exam.controller -> deleteExam");
    respondError(req, res, 500, "No se pudo eliminar el examen");
  }
}

module.exports = {
  getExams,
  createExam,
  getExamById,
  updateExam,
  deleteExam,
};
