import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Função para gerar token JWT
const generateToken = (id) => {
  // Substitua "SEU_SEGREDO_JWT" por uma string secreta forte em um ambiente de produção
  // e armazene-a em variáveis de ambiente.
  return jwt.sign({ id }, process.env.JWT_SECRET || "SEGREDO_JWT_PARA_DESENVOLVIMENTO", {
    expiresIn: "30d", // Token expira em 30 dias
  });
};

// Registrar um novo usuário
export const registerUser = async (req, res) => {
  const { full_name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Usuário já existe com este e-mail." });
    }

    const user = await User.create({
      full_name,
      email,
      password, // O hash será feito pelo middleware pre-save no modelo User
      role: role || "user", // Define o papel como 'user' por padrão
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Dados de usuário inválidos." });
    }
  } catch (error) {
    console.error("Erro no registro do usuário:", error);
    res.status(500).json({ message: "Erro no servidor ao registrar usuário.", error: error.message });
  }
};

// Autenticar usuário (Login)
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Lógica especial para login admin/admin
    if (email === "admin" && password === "admin") {
      let adminUser = await User.findOne({ email: "admin@admin.com" }); // Usar um email fixo para o admin
      if (!adminUser) {
        // Cria o usuário admin se não existir
        adminUser = await User.create({
          full_name: "Administrador",
          email: "admin@admin.com", // Email único para o admin
          password: "admin", // A senha será hasheada pelo pre-save hook
          role: "admin",
        });
      }
      // Para o login admin/admin, não precisamos verificar a senha com bcrypt aqui,
      // pois o usuário pode não ter sido criado com senha hasheada se for a primeira vez.
      // No entanto, se ele já existe, a senha no banco estará hasheada.
      // Para simplificar o login de teste, geramos o token diretamente.
      // Em um cenário real, o admin também teria uma senha forte e hasheada.
      return res.json({
        _id: adminUser._id,
        full_name: adminUser.full_name,
        email: adminUser.email,
        role: adminUser.role,
        token: generateToken(adminUser._id),
      });
    }

    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "E-mail ou senha inválidos." });
    }
  } catch (error) {
    console.error("Erro no login do usuário:", error);
    res.status(500).json({ message: "Erro no servidor ao tentar fazer login.", error: error.message });
  }
};

// Obter dados do usuário logado (exemplo de rota protegida)
export const getMe = async (req, res) => {
  // req.user é definido pelo middleware de autenticação (que ainda precisa ser criado)
  if (!req.user) {
    return res.status(401).json({ message: "Não autorizado, token inválido ou não fornecido." });
  }
  try {
    // O método User.me espera o ID do usuário
    const user = await User.me(req.user._id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Usuário não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    res.status(500).json({ message: "Erro no servidor ao buscar dados do usuário.", error: error.message });
  }
};

