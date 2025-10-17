export const isSuperAdmin = (req, res, next) => {
  if (req.user.role !== "superAdmin") {
    return res.status(403).json({ message: "Acceso denegado: solo SuperAdmin" });
  }
  next();
};

export const isEmpleado = (req, res, next) => {
  if (!["superAdmin", "empleado"].includes(req.user.role)) {
    return res.status(403).json({ message: "Acceso denegado: solo Empleado o SuperAdmin" });
  }
  next();
};

export const isUsuario = (req, res, next) => {
  if (!["usuario", "empleado", "superAdmin"].includes(req.user.role)) {
    return res.status(403).json({ message: "Acceso denegado" });
  }
  next();
};
