import express from "express";
import "dotenv/config";
import clinicaRoutes from "./routes/clinicaRoutes.js";
import corsMiddleware from "./middlewares/corsMiddleware.js";
import { testarConexao } from "./database/conexao.js";

// CRIANDO A APLICAÇÃO
const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use(corsMiddleware);
app.use(express.json());

// ROTAS
app.use("/animais", clinicaRoutes);

// ROTA INICIAL
app.get("/", function (req, res) {
  res.status(200).json({
    mensagem: "API da Clínica Veterinária funcionando!"
  });
});

// INICIANDO O SERVIDOR
async function iniciarServidor() {
  try {
    await testarConexao();

    app.listen(PORT, function () {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (erro) {
    console.error("Não foi possível iniciar o servidor:", erro.message);
    process.exitCode = 1;
  }
}

iniciarServidor();
