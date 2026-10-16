import express from "express";
import {
  atualizarAnimal,
  cadastrarAnimal,
  listarAnimais,
  buscarAnimalPorID,
  excluirAnimal
} from "../controllers/clinicaController.js";

const router = express.Router();

router.get("/", listarAnimais);
router.post("/", cadastrarAnimal);
router.put("/:id", atualizarAnimal);
router.get("/:id", buscarAnimalPorID);
router.delete("/:id", excluirAnimal);

export default router;