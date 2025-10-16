export const isSuperAdmin = (req, res, next) => {
  if (req.userRole !== "superAdmin") {
    return res.status(403).json({ error: "Acceso denegado: solo SuperAdmin" });
  }
  next();
};

export const isEmpleado = (req, res, next) => {
  if (req.userRole !== "superAdmin" && req.userRole !== "empleado") {
    return res.status(403).json({ error: "Acceso denegado: solo empleados o SuperAdmin" });
  }
  next();
};

export const isUsuario = (req, res, next) => {
  if (!["usuario", "empleado", "superAdmin"].includes(req.userRole)) {
    return res.status(403).json({ error: "Acceso denegado: usuario no válido" });
  }
  next();
};
