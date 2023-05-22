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
          { message: "Verifique los datos ingresados nulo" },
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
async function updateUser(id, user) {
  try {
    const { error } = userBodySchema.validate(user) // Validamos el cuerpo del usuario con el esquema definido
    if (error) return null // Si hay errores de validación, retornamos null
    const roles = await Role.find({ name: { $in: user.roles } }) // Buscamos los roles por nombre en la colección "Role"
    const roleIds = roles.map(role => role._id) // Obtenemos los identificadores ObjectId de los roles encontrados
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...user, roles: roleIds }, // Actualizamos el usuario asignando los nuevos roles
      { new: true } // Opción para retornar el usuario actualizado
    )
    return updatedUser // Retornamos el usuario actualizado
  } catch (error) {
    handleError(error, "user.service -> updateUser") // Manejamos cualquier error ocurrido
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

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
