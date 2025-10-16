import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "alagrandelepusecuca2025");

    req.userId = decoded.id;
    req.userRole = decoded.role; 
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
};
