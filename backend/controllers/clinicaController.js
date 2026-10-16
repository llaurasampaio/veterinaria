import { pool } from "../database/conexao.js";

async function listarAnimais(req, res) {
  try {
    const [animais] = await pool.query("SELECT * FROM animais");
    res.status(200).json(animais);
  } catch (erro) {
    console.log("Erro ao buscar animais:", erro);
    res.status(500).json({ mensagem: "Erro ao buscar animais." });
  }
}

async function buscarAnimalPorID(req, res) {
  try {
    const id = req.params.id;
    const [animais] = await pool.query(
      "SELECT * FROM animais WHERE id = ?",
      [id]
    );

    if (animais.length === 0) {
      return res.status(404).json({ mensagem: "Animal não encontrado." });
    }

    res.status(200).json(animais[0]);
  } catch (erro) {
    console.log("Erro ao buscar animal:", erro);
    res.status(500).json({ mensagem: "Erro ao buscar animal." });
  }
}

// POST
async function cadastrarAnimal(req, res) {
  try {
    const { nome, especie, raca, idade, nome_tutor } = req.body;

    if (!nome || !especie || !raca || !idade || !nome_tutor) {
      return res.status(400).json({
        mensagem: "Preencha todos os campos."
      });
    }

    const [resultado] = await pool.query(
      "INSERT INTO animais (nome, especie, raca, idade, nome_tutor) VALUES (?, ?, ?, ?, ?)",
      [nome, especie, raca, idade, nome_tutor]
    );

    res.status(201).json({
      mensagem: "Animal cadastrado com sucesso.",
      id: resultado.insertId
    });
  } catch (erro) {
    console.log("Erro ao cadastrar animal:", erro);
    res.status(500).json({ mensagem: "Erro ao cadastrar animal." });
  }
}

// PUT
async function atualizarAnimal(req, res) {
  try {
    const id = req.params.id;
    const { nome, especie, raca, idade, nome_tutor } = req.body;

    if (!nome || !especie || !raca || !idade || !nome_tutor) {
      return res.status(400).json({
        mensagem: "Preencha todos os campos."
      });
    }

    const [resultado] = await pool.query(
      "UPDATE animais SET nome = ?, especie = ?, raca = ?, idade = ?, nome_tutor = ? WHERE id = ?",
      [nome, especie, raca, idade, nome_tutor, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: "Animal não encontrado." });
    }

    res.status(200).json({
      mensagem: "Animal atualizado com sucesso."
    });
  } catch (erro) {
    console.log("Erro ao atualizar animal:", erro);
    res.status(500).json({ mensagem: "Erro ao atualizar animal." });
  }
}

// DELETE
async function excluirAnimal(req, res) {
  try {
    const id = req.params.id;

    const [resultado] = await pool.query(
      "DELETE FROM animais WHERE id = ?",
      [id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: "Animal não encontrado." });
    }

    res.status(200).json({
      mensagem: "Animal excluído com sucesso."
    });
  } catch (erro) {
    console.log("Erro ao excluir animal:", erro);
    res.status(500).json({ mensagem: "Erro ao excluir animal." });
  }
}

export {
  listarAnimais,
  cadastrarAnimal,
  atualizarAnimal,
  buscarAnimalPorID,
  excluirAnimal
};
