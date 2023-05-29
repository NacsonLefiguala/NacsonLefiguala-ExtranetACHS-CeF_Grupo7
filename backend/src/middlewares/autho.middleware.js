// Autorizacion - Comprobar el rol del usuario
const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");
const { respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");

/*async function isAdmin(req, res, next) {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }
    return respondError(req, res, 401, "Require Admin Role!");
  } catch (error) {
    handleError(error, "autho.middleware -> isAdmin");
  }
}*/

const jwt = require("jsonwebtoken");
const { configEnv } = require("../config/configEnv.js");
const { JWT_SECRET } = configEnv();

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No se proporcionó un token de autenticación" });
  }

  jwt.verify(token, JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Token de autenticación inválido" });
    }
    req.userId = decoded.id;
    next();
  });
}

function isAdmin(req, res, next) {
  // Aquí puedes implementar la lógica para verificar si el usuario es un administrador.
  // Puedes obtener el userId del objeto req y luego verificar su rol en la base de datos o en alguna otra lógica personalizada.
  // Por simplicidad, asumiremos que el usuario es un administrador si su userId es "admin".

  if (req.userId !== "admin") {
    return res.status(403).json({ message: "Acceso denegado. Esta función solo está disponible para administradores" });
  }

  next();
}

module.exports = {
  verifyToken,
  isAdmin,
}
