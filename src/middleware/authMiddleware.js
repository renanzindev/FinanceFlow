import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Obter token do header (Bearer TOKEN_STRING)
      token = req.headers.authorization.split(" ")[1];

      // Verificar o token
      // Substitua "SEU_SEGREDO_JWT" pelo mesmo segredo usado na geração do token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "SEGREDO_JWT_PARA_DESENVOLVIMENTO");

      // Obter usuário do token (sem a senha)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Não autorizado, usuário não encontrado com este token." });
      }

      next();
    } catch (error) {
      console.error("Erro na autenticação do token:", error);
      return res.status(401).json({ message: "Não autorizado, token falhou." });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Não autorizado, nenhum token fornecido." });
  }
};
