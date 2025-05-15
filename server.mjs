import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Conectar ao MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors()); // Habilitar CORS para todas as origens (ajustar em produção se necessário)
app.use(express.json()); // Para parsear JSON no corpo das requisições

// Rotas da API
app.use("/api/auth", authRoutes);

// Rota de teste para verificar se o servidor está no ar
app.get("/", (req, res) => {
  res.send("Servidor FinanceFlow API está rodando!");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
