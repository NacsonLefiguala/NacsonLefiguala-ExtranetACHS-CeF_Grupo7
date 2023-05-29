"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const UserService = require("../services/user.service");
const { handleError } = require("../utils/errorHandler");

/**
 * @name getUsers
 * @description Obtiene todos los usuarios
 * @param req {Request}
 * @param res {Response}
 */
async function getUsers(req, res) {
  try {
    const usuarios = await UserService.getUsers();
    usuarios.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, usuarios);
  } catch (error) {
    respondError(req, res, 400, error.message);
  }
}

/**
 * @name createUser
 * @description Crea un nuevo usuario
 * @param req {Request}
 * @param res {Response}
 */
async function createUser(req, res) {
  try {
    const nuevoUser = await UserService.createUser(req.body);
    nuevoUser === null
      ? respondError(
        req,
        res,
        400,
        "Error en la validacion de datos",
        "Bad Request",
        { message: "Verifique los datos ingresados" },
      )
      : respondSuccess(req, res, 201, nuevoUser);
  } catch (error) {
    handleError(error, "user.controller -> createUser");
    respondError(req, res, 500, "No se pudo crear el usuario");
  }
}

/**
 * @name getUserById
 * @description Obtiene un usuario por su id
 * @param req {Request}
 * @param res {Response}
 */
async function getUserById(req, res) {
  try {
    const { id } = req.params;

    const user = await UserService.getUserById(id);
    user === null
      ? respondError(
        req,
        res,
        404,
        "No se encontro el usuario solicitado",
        "Not Found",
        { message: "Verifique el id ingresado" },
      )
      : respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "user.controller -> getUserById");
    respondError(req, res, 500, "No se pudo obtener el usuario");
  }
}

/**
 * @name updateUser
 * @description Actualiza un usuario por su id
 * @param req {Request}
 * @param res {Response}
 */
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const user = await UserService.updateUser(id, req.body);
    user === null
      ? respondError(
        req,
        res,
        404,
        "No se encontro el usuario solicitado",
        "Not Found",
        { message: "Verifique el id ingresado" },
      )
      : respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "user.controller -> updateUser");
    respondError(req, res, 500, "No se pudo actualizar el usuario");
  }
}

/**
 * @name deleteUser
 * @description Elimina un usuario por su id
 * @param req {Request}
 * @param res {Response}
 */
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await UserService.deleteUser(id);
    user === null
      ? respondError(
        req,
        res,
        404,
        "No se encontro el usuario solicitado",
        "Not Found",
        { message: "Verifique el id ingresado" },
      )
      : respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "user.controller -> deleteUser");
    respondError(req, res, 500, "No se pudo eliminar el usuario");
  }
}

//-----------------------------------
// los administradores puedan designar fecha, hora y sede para los
// exámenes médicos que los usuarios deben realizar

async function assignMedicalExam(req, res) {
  try {
    const { userId } = req.params;
    const { date, time, location } = req.body;

    // Verificar si el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar si el usuario es administrador
    if (!isAdmin(user)) {
      return res.status(403).json({ message: "Acceso no autorizado" });
    }

    // Asignar fecha, hora y sede del examen médico
    user.medicalExamDate = date;
    user.medicalExamTime = time;
    user.medicalExamLocation = location;

    // Guardar los cambios en la base de datos
    await user.save();

    res.json({ message: "Examen médico asignado exitosamente" });
  } catch (error) {
    handleError(error, "user.controller -> assignMedicalExam");
    res.status(500).json({ message: "Error al asignar el examen médico" });
  }
}

//----------------------------------

//-----------------------------------
// los brigadistas pueden subir exaemenes medicos en formato PDF 
// y que los administradores puedan buscar los examenes por el rut



//-----------------------------------
//-----------------------------------
//cambio de estado de los examenes medicos por administrador
//y revision de los brigadistas de sus examenes medicos

const User = require("../models/user.model");

// Actualizar el estado del examen médico (solo para administradores)
const updateMedicalExamStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { medicalExamStatus } = req.body;

    // Verificar si el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar si el usuario tiene permisos de administrador
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Acceso no autorizado" });
    }

    // Actualizar el estado del examen médico del usuario
    user.medicalExamStatus = medicalExamStatus;
    await user.save();

    res.json({ message: "Estado del examen médico actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al actualizar el estado del examen médico" });
  }
};

// Obtener el estado del examen médico
const getMedicalExamStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verificar si el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar si el usuario es propietario del examen médico o si es un administrador
    if (req.user.id !== userId && !req.user.isAdmin) {
      return res.status(403).json({ message: "Acceso no autorizado" });
    }

    // Obtener el estado del examen médico
    const medicalExamStatus = user.medicalExamStatus;

    //------------------------------------------
    // Enviar correo electrónico si el estado es aprobado

    await user.save();

    if (medicalExamStatus === "aprobado") {
      const userEmail = user.email;
      const emailSubject = "Estado de examen médico aprobado";
      const emailBody = "Su examen médico ha sido aprobado. ¡Felicitaciones!";
      await emailService.sendEmail(userEmail, emailSubject, emailBody);
    }

    //------------------------------------------

    res.json({ medicalExamStatus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el estado del examen médico" });
  }
  //---------------------------------------

};






// Subir el examen médico
const uploadMedicalExam = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verificar si el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar si el usuario es propietario del examen médico
    if (req.user.id !== userId) {
      return res.status(403).json({ message: "Acceso no autorizado" });
    }

    // ... Código para subir el examen médico usando multer ...
    // Aquí puedes utilizar el ejemplo proporcionado anteriormente

    res.json({ message: "Examen médico subido exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al subir el examen médico" });
  }
};

// Obtener los exámenes médicos (solo para administradores)
const getMedicalExams = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verificar si el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar si el usuario tiene permisos de administrador
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Acceso no autorizado" });
    }

    // Obtener el nombre del archivo del examen médico
    const medicalExamFile = user.medicalExamFile;

    res.json({ medicalExamFile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los exámenes médicos" });
  }
};









module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  assignMedicalExam,
  uploadMedicalExam,
  updateMedicalExamStatus,
  getMedicalExamStatus,
  getMedicalExams
};
