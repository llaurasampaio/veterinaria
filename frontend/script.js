const botao = document.getElementById("btnBuscar");
const listaAnimais = document.getElementById("listaAnimais");
const mensagem = document.getElementById("mensagem");

const formulario = document.getElementById("formAnimal");
const campoNome = document.getElementById("nome");
const campoEspecie = document.getElementById("especie");
const campoRaca = document.getElementById("raca");
const campoIdade = document.getElementById("idade");
const campoTutor = document.getElementById("nome_tutor");

const botaoSalvar = document.getElementById("btnSalvar");

let idEdicao = null;

botao.addEventListener("click", buscarAnimais);
formulario.addEventListener("submit", salvarAnimal);

async function buscarAnimais() {
  try {
    mensagem.textContent = "Buscando animais...";
    const resposta = await fetch("http://localhost:3000/animais");
    if (!resposta.ok) {
      throw new Error("Erro HTTP: " + resposta.status);
    }
    const animais = await resposta.json();
    listaAnimais.innerHTML = "";

    if (animais.length === 0) {
      mensagem.textContent = "Nenhum animal cadastrado.";
      return;
    }

    for (let i = 0; i < animais.length; i++) {
      listaAnimais.innerHTML += `
        <tr>
          <td>${animais[i].id}</td>
          <td>${animais[i].nome}</td>
          <td>${animais[i].especie}</td>
          <td>${animais[i].raca}</td>
          <td>${animais[i].idade}</td>
          <td>${animais[i].nome_tutor}</td>
          <td>
            <button onclick="editarAnimal(${animais[i].id})">Editar</button>
            <button onclick="excluirAnimal(${animais[i].id})">Excluir</button>
          </td>
        </tr>`;
    }
    mensagem.textContent = animais.length + " animais encontrados.";
  } catch (erro) {
    mensagem.textContent = "Não foi possível carregar os animais";
    console.log("Error:", erro);
  }
}

async function salvarAnimal(evento) {
  evento.preventDefault();
  if (idEdicao == null) {
    await cadastrarAnimal();
  } else {
    await atualizarAnimal();
  }
}

async function cadastrarAnimal() {
  try {
    const animal = {
      nome: campoNome.value,
      especie: campoEspecie.value,
      raca: campoRaca.value,
      idade: campoIdade.value,
      nome_tutor: campoTutor.value
    };
    console.log("Animal enviado:", animal);

    const resposta = await fetch("http://localhost:3000/animais", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(animal)
    });

    if (!resposta.ok) {
      throw new Error("Erro HTTP: " + resposta.status);
    }

    const dados = await resposta.json();
    console.log("Resposta da API:", dados);
    formulario.reset();
    await buscarAnimais();
    mensagem.textContent = dados.mensagem;
  } catch (erro) {
    mensagem.textContent = "Não foi possível cadastrar o animal";
    console.log("Erro ao cadastrar animal:", erro);
  }
}

async function editarAnimal(id) {
  try {
    const resposta = await fetch("http://localhost:3000/animais/" + id);
    if (!resposta.ok) {
      throw new Error("Erro HTTP: " + resposta.status);
    }
    const animal = await resposta.json();
    campoNome.value = animal.nome;
    campoEspecie.value = animal.especie;
    campoRaca.value = animal.raca;
    campoIdade.value = animal.idade;
    campoTutor.value = animal.nome_tutor;

    idEdicao = animal.id;
    botaoSalvar.textContent = "Atualizar";
    mensagem.textContent = "Editando animal de ID " + animal.id;
  } catch (erro) {
    mensagem.textContent = "Não foi possível carregar o animal";
    console.log("Erro ao carregar animal:", erro);
  }
}

async function atualizarAnimal() {
  try {
    const animal = {
      nome: campoNome.value,
      especie: campoEspecie.value,
      raca: campoRaca.value,
      idade: campoIdade.value,
      nome_tutor: campoTutor.value
    };
    console.log("Animal atualizado:", animal);

    const resposta = await fetch("http://localhost:3000/animais/" + idEdicao, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(animal)
    });

    if (!resposta.ok) {
      throw new Error("Erro HTTP: " + resposta.status);
    }

    const dados = await resposta.json();
    formulario.reset();
    idEdicao = null;
    botaoSalvar.textContent = "Cadastrar";
    await buscarAnimais();
    mensagem.textContent = dados.mensagem;
  } catch (erro) {
    mensagem.textContent = "Não foi possível atualizar o animal";
    console.log("Erro ao atualizar animal:", erro);
  }
}

async function excluirAnimal(id) {
  const confirmar = confirm("Deseja realmente excluir este animal?");
  if (!confirmar) return;

  try {
    const resposta = await fetch("http://localhost:3000/animais/" + id, {
      method: "DELETE"
    });
    if (!resposta.ok) {
      throw new Error("Erro HTTP: " + resposta.status);
    }
    const dados = await resposta.json();
    await buscarAnimais();
    mensagem.textContent = dados.mensagem;
  } catch (erro) {
    mensagem.textContent = "Não foi possível excluir o animal";
    console.log("Erro ao excluir animal:", erro);
  }
}