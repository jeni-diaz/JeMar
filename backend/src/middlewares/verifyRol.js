export const isSuperAdmin = (req, res, next) => {
  if (req.user.role !== "SuperAdmin") {
    return res.status(403).json({ message: "Acceso denegado: solo SuperAdmin" });
  }
  next();
};

export const isEmpleado = (req, res, next) => {
  if (!["SuperAdmin", "Empleado"].includes(req.user.role)) {
    return res.status(403).json({ message: "Acceso denegado: solo Empleado o SuperAdmin" });
  }
  next();
};

export const isUsuario = (req, res, next) => {
  if (!["Usuario", "Empleado", "SuperAdmin"].includes(req.user.role)) {
    return res.status(403).json({ message: "Acceso denegado" });
  }
  next();
};
